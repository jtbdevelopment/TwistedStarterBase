import {ReflectiveInjector} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {Game} from '../games/game.model';
import {GameCache} from './gamecache.service';
import {IGameClassifier} from './igameclassifier.service';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, RequestOptions, ConnectionBackend, Http, ResponseOptions, Response} from '@angular/http';
import {MessageBusService} from '../messagebus/messagebus.service';
import {IGameFactory} from '../games/igamefactory.service';
import {MultiPlayerGame} from '../games/multiplayergame.model';

class MockClassifier implements IGameClassifier {
    public classifications = ['A', 'B', 'D'];

    public classificationSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);

    public getClassifications(): Observable<string[]> {
        return Observable.from(this.classificationSubject);
    }

    //  Classify game into one of the buckets returned above
    public classifyGame(game: Game): string {
        return game.gamePhase;
    }
}

class MockGameFactory implements IGameFactory {
    public newGame(original?: Object): any {
        return new MultiPlayerGame(original);
    }
}

describe('Service: game cache service', () => {
    let backend: MockBackend;
    let lastConnection: any;
    let gameCache: GameCache;
    let messageBus: MessageBusService;
    let classifier: MockClassifier;
    let classifications: string[];

    beforeEach(async(() => {
        classifications = null;
        lastConnection = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
                {provide: ConnectionBackend, useClass: MockBackend},
                {provide: RequestOptions, useClass: BaseRequestOptions},
                {provide: 'GameClassifier', useClass: MockClassifier},
                {provide: 'GameFactory', useClass: MockGameFactory},
                Http,
                MessageBusService,
                GameCache
            ]
        );
        gameCache = this.injector.get(GameCache);
        messageBus = this.injector.get(MessageBusService);
        classifier = this.injector.get('GameClassifier');
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
        gameCache.getCategories().subscribe(c => classifications = c);
    }));

    it('initial state is no categories', () => {
        expect(classifications).toEqual([]);
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
                tick();
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
                expect(classifications).toEqual([]);
            });

            describe('state after connected and categories are ready', () => {
                it('categories are available and empty games initialized', fakeAsync(() => {
                    classifier.classificationSubject.next(classifier.classifications);
                    tick();
                    expect(classifications).toEqual(classifier.classifications);
                    let games: Game[][] = [];
                    classifier.classifications.forEach((c, i) => {
                        games.push(null);
                        gameCache.getGames(c).subscribe(x => games[i] = x);
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
                    gameCache.getGames(c).subscribe(x => games[i] = x);
                });
            });

            it('categories are available and empty games initialized', async(() => {
                expect(classifications).toEqual(classifier.classifications);
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
});
