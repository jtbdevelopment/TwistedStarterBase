import {ReflectiveInjector} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {Game} from '../games/game.model';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, RequestOptions, ConnectionBackend, Http, ResponseOptions, Response} from '@angular/http';
import {GameClassifier} from './game-classifier.serviceinterface';
import {GameCacheService} from './game-cache.service';
import {GameFactory} from '../games/gamefactory.serviceinterface';
import {MultiPlayerGame} from '../games/multi-player-game.model';
import {MessageBusService} from '../messagebus/message-bus.service';

class MockClassifier implements GameClassifier {
    public classifications = ['A', 'B', 'D'];

    public classificationSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);

    public getClassifications(): Observable<string[]> {
        return Observable.from(this.classificationSubject);
    }

    public getIcons(): Observable<Map<string, string>> {
        return new BehaviorSubject(null);
    }

    //  Classify game into one of the buckets returned above
    public classifyGame(game: Game): string {
        return game.gamePhase;
    }
}

class MockGameFactory implements GameFactory {
    public newGame(original?: Object): any {
        return new MultiPlayerGame(original);
    }
}

describe('Service: game cache service', () => {
    let backend: MockBackend;
    let lastConnection: any;
    let gameCache: GameCacheService;
    let messageBus: MessageBusService;
    let classifier: MockClassifier;

    beforeEach(async(() => {
        lastConnection = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
                {provide: ConnectionBackend, useClass: MockBackend},
                {provide: RequestOptions, useClass: BaseRequestOptions},
                {provide: 'GameClassifier', useClass: MockClassifier},
                {provide: 'GameFactory', useClass: MockGameFactory},
                Http,
                MessageBusService,
            GameCacheService
            ]
        );
        gameCache = this.injector.get(GameCacheService);
        messageBus = this.injector.get(MessageBusService);
        classifier = this.injector.get('GameClassifier');
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
    }));

    it('initial state is no categories', () => {
        expect(gameCache.getGamesCount()).toBeCloseTo(0);
        expect(lastConnection).toBeNull();
    });

    describe('initialization', () => {
        let expectedGames = [
            new MultiPlayerGame({id: '1', gamePhase: 'B', lastUpdate: 0}),
            new MultiPlayerGame({id: '2', gamePhase: 'A', lastUpdate: 0}),
            new MultiPlayerGame({id: '3', gamePhase: 'B', lastUpdate: 0}),
            new MultiPlayerGame({id: '4', gamePhase: 'D', lastUpdate: 0}),
            new MultiPlayerGame({id: '5', gamePhase: 'B', lastUpdate: 0}),
        ];

        describe('state after connecting but categories are not ready', () => {
            beforeEach(fakeAsync(() => {
                messageBus.connectionStatus.next(true);
                tick();
                expect(lastConnection.request.url).toEqual('/api/player/games');
                lastConnection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(expectedGames)
                })));
                tick();
            }));

            afterEach(fakeAsync(() => {
                expectedGames.forEach(expectedGame => {
                    let game: Game;
                    gameCache.getGame(expectedGame.id).subscribe(x => game = x);
                    tick();
                    expect(JSON.stringify(game)).toEqual(JSON.stringify(expectedGame));
                });
            }));

            it('requests games after connected', () => {
                expect(gameCache.getGamesCount()).toBeCloseTo(5);
            });

            describe('state after connected and categories are ready', () => {
                it('categories are available and empty games initialized', fakeAsync(() => {
                    classifier.classificationSubject.next(classifier.classifications);
                    tick();
                    let games: Game[][] = [];
                    classifier.classifications.forEach((c, i) => {
                        games.push(null);
                        gameCache.getGamesForCategory(c).subscribe(x => games[i] = x);
                    });
                    tick();
                    expect(gameCache.getGamesCount()).toBeCloseTo(5);
                    expect(JSON.stringify(games[0])).toEqual(JSON.stringify([expectedGames[1]]));
                    //  cant guarantee order
                    expect(JSON.stringify(games[1].filter(x => x.id === expectedGames[0].id))).toEqual(JSON.stringify([expectedGames[0]]));
                    expect(JSON.stringify(games[1].filter(x => x.id === expectedGames[2].id))).toEqual(JSON.stringify([expectedGames[2]]));
                    expect(JSON.stringify(games[1].filter(x => x.id === expectedGames[4].id))).toEqual(JSON.stringify([expectedGames[4]]));
                    expect(JSON.stringify(games[2])).toEqual(JSON.stringify([expectedGames[3]]));
                }));
            });
        });

        describe('state after categories are ready, but not connected initially', () => {
            let games: Game[][] = [];
            beforeEach(async() => {
                classifier.classificationSubject.next(classifier.classifications);
                classifier.classifications.forEach((c, i) => {
                    games.push(null);
                    gameCache.getGamesForCategory(c).subscribe(x => games[i] = x);
                });
            });

            it('categories are available and empty games initialized', async(() => {
                games.forEach(gameList => {
                    expect(gameList).toEqual([]);
                });
                expect(gameCache.getGamesCount()).toBeCloseTo(0);
                expect(lastConnection).toBeNull();
            }));

            describe('state after categories are ready and server connected', () => {
                beforeEach(async(() => {
                    messageBus.connectionStatus.next(true);
                }));

                it('requests games after connected', fakeAsync(() => {
                    expect(lastConnection.request.url).toEqual('/api/player/games');
                    lastConnection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(expectedGames)
                    })));
                    tick();

                    expect(gameCache.getGamesCount()).toBeCloseTo(5);
                    expect(JSON.stringify(games[0])).toEqual(JSON.stringify([expectedGames[1]]));
                    expect(JSON.stringify(games[1])).toEqual(JSON.stringify([expectedGames[0], expectedGames[2], expectedGames[4]]));
                    expect(JSON.stringify(games[2])).toEqual(JSON.stringify([expectedGames[3]]));
                }));
            });
        });
    });

    describe('updates after initialized', () => {
        let expectedGames = [
            new MultiPlayerGame({id: '1', gamePhase: 'B', lastUpdate: 0}),
            new MultiPlayerGame({id: '2', gamePhase: 'A', lastUpdate: 0}),
            new MultiPlayerGame({id: '3', gamePhase: 'B', lastUpdate: 0}),
            new MultiPlayerGame({id: '4', gamePhase: 'D', lastUpdate: 0}),
            new MultiPlayerGame({id: '5', gamePhase: 'B', lastUpdate: 0}),
        ];

        let games: Map<string, Game[]> = new Map<string, Game[]>();
        beforeEach(fakeAsync(() => {
            messageBus.connectionStatus.next(true);
            tick();
            expect(lastConnection.request.url).toEqual('/api/player/games');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(expectedGames)
            })));
            classifier.classificationSubject.next(classifier.classifications);
            tick();
            classifier.classifications.forEach((c) => {
                games.set(c, null);
                gameCache.getGamesForCategory(c).subscribe(x => games.set(c, x));
            });
            tick();
        }));

        it('new game adding to list', fakeAsync(() => {
            let newGame = new MultiPlayerGame({id: '6', gamePhase: 'A', lastUpdate: 1});
            messageBus.gameUpdates.next(newGame);
            tick();

            let subscribed: Game;
            gameCache.getGame(newGame.id).subscribe(x => subscribed = x);
            tick();

            expect(gameCache.getGamesCount()).toBeCloseTo(6);
            expect(JSON.stringify(subscribed)).toEqual(JSON.stringify(newGame));
            expect(JSON.stringify(games.get('A'))).toEqual(JSON.stringify([expectedGames[1], newGame]));
        }));

        it('updating newer version of game in list, keeping classification', fakeAsync(() => {
            let newGame = new MultiPlayerGame({id: '4', gamePhase: 'D', lastUpdate: 1});
            messageBus.gameUpdates.next(newGame);
            tick();
            let subscribed: Game;
            gameCache.getGame(newGame.id).subscribe(x => subscribed = x);
            tick();

            expect(gameCache.getGamesCount()).toBeCloseTo(5);
            expect(JSON.stringify(subscribed)).toEqual(JSON.stringify(newGame));
            expect(JSON.stringify(games.get('D'))).toEqual(JSON.stringify([newGame]));
        }));

        it('ignores older version of game in list', fakeAsync(() => {
            let newGame = new MultiPlayerGame({id: '4', gamePhase: 'D', lastUpdate: -1});
            messageBus.gameUpdates.next(newGame);
            tick();
            let subscribed: Game;
            gameCache.getGame(newGame.id).subscribe(x => subscribed = x);
            tick();

            expect(gameCache.getGamesCount()).toBeCloseTo(5);
            expect(JSON.stringify(subscribed)).toEqual(JSON.stringify(expectedGames[3]));
            expect(JSON.stringify(games.get('D'))).toEqual(JSON.stringify([expectedGames[3]]));
        }));

        it('updating newer version of game in list, changing classification', fakeAsync(() => {
            let newGame = new MultiPlayerGame({id: '4', gamePhase: 'A', lastUpdate: 1});
            messageBus.gameUpdates.next(newGame);
            tick();
            let subscribed: Game;
            gameCache.getGame(newGame.id).subscribe(x => subscribed = x);
            tick();

            expect(gameCache.getGamesCount()).toBeCloseTo(5);
            expect(JSON.stringify(subscribed)).toEqual(JSON.stringify(newGame));
            expect(JSON.stringify(games.get('D'))).toEqual(JSON.stringify([]));
            expect(JSON.stringify(games.get('A'))).toEqual(JSON.stringify([expectedGames[1], newGame]));
        }));

        it('deals with non classifiable games on existing classified', fakeAsync(() => {
            let newGame = new MultiPlayerGame({id: '4', gamePhase: 'AD', lastUpdate: 1});
            messageBus.gameUpdates.next(newGame);
            tick();

            let subscribed: Game;
            gameCache.getGame(newGame.id).subscribe(x => subscribed = x);
            tick();

            expect(gameCache.getGamesCount()).toBeCloseTo(5);
            expect(JSON.stringify(subscribed)).toEqual(JSON.stringify(newGame));
            expect(JSON.stringify(games.get('A'))).toEqual(JSON.stringify([expectedGames[1]]));
            expect(JSON.stringify(games.get('B'))).toEqual(JSON.stringify([expectedGames[0], expectedGames[2], expectedGames[4]]));
            expect(JSON.stringify(games.get('D'))).toEqual(JSON.stringify([]));
            expect(games.get('AD')).toBeUndefined();
        }));

        it('deals with non classifiable games on existing classified moving to classified', fakeAsync(() => {
            let newGame = new MultiPlayerGame({id: '6', gamePhase: 'AD', lastUpdate: 1});
            messageBus.gameUpdates.next(newGame);
            tick();

            let subscribed: Game;
            gameCache.getGame(newGame.id).subscribe(x => subscribed = x);
            tick();

            expect(gameCache.getGamesCount()).toBeCloseTo(6);
            expect(JSON.stringify(subscribed)).toEqual(JSON.stringify(newGame));

            expect(JSON.stringify(games.get('A'))).toEqual(JSON.stringify([expectedGames[1]]));
            expect(JSON.stringify(games.get('B'))).toEqual(JSON.stringify([expectedGames[0], expectedGames[2], expectedGames[4]]));
            expect(JSON.stringify(games.get('D'))).toEqual(JSON.stringify([expectedGames[3]]));
            expect(games.get('AD')).toBeUndefined();

            let updateToGame = new MultiPlayerGame({id: '6', gamePhase: 'D', lastUpdate: 2});
            messageBus.gameUpdates.next(updateToGame);
            tick();

            expect(gameCache.getGamesCount()).toBeCloseTo(6);
            expect(JSON.stringify(subscribed)).toEqual(JSON.stringify(updateToGame));

            expect(JSON.stringify(games.get('A'))).toEqual(JSON.stringify([expectedGames[1]]));
            expect(JSON.stringify(games.get('B'))).toEqual(JSON.stringify([expectedGames[0], expectedGames[2], expectedGames[4]]));
            expect(JSON.stringify(games.get('D'))).toEqual(JSON.stringify([expectedGames[3], updateToGame]));
            expect(games.get('AD')).toBeUndefined();
        }));
    });
});
