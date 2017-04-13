import {MessageBusService} from '../messagebus/messagebus.service';
import {Inject, Injectable} from '@angular/core';
import {IGameClassifier} from './igameclassifier.service';
import {Game} from '../games/game.model';
import {Http} from '@angular/http';
import {IGameFactory} from '../games/igamefactory.service';
import {BehaviorSubject, Observable} from 'rxjs';

//  TODO - split up fetcher from cache logic?
@Injectable()
export class GameCache {
    private gamesById: Map<string, BehaviorSubject<Game>> = new Map<string, BehaviorSubject<Game>>();
    private gameCategoriesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    private gamesByClassification: Map<string, BehaviorSubject<Game[]>> = new Map<string, BehaviorSubject< Game[]>>();

    private isConnected: boolean = false;

    constructor(private http: Http,
                private messageBus: MessageBusService,
                @Inject('GameFactory') private gameFactory: IGameFactory,
                @Inject('GameClassifier') private gameClassifier: IGameClassifier) {
        gameClassifier.getClassifications().subscribe(classifications => {
            this.initializeCategoryCaches(classifications);
            //  In case classifier took longer than logging in to setup classifications
            this.reclassifyGames();
        });

        this.messageBus.connectionStatus.subscribe(status => {
            this.processConnectionStatus(status);
        });
    }

    //  probably never used except for testing?
    public getGamesCount(): number {
        return this.gamesById.size;
    }

    public getGame(id: string): Observable<Game> {
        return Observable.from(this.gamesById.get(id));
    }

    //  Convenience so other classes dont also need to process classifier
    public getCategories(): Observable<string[]> {
        return Observable.from(this.gameCategoriesSubject);
    }

    public getGames(category: string): Observable<any[]> {
        return Observable.from(this.gamesByClassification.get(category));
    }

    public processGame(game: Game): void {
        let idSubject: BehaviorSubject<Game>;
        let cachedGame: any;
        if (this.gamesById.has(game.id)) {
            idSubject = this.gamesById.get(game.id);
            cachedGame = idSubject.getValue();
            if (cachedGame.lastUpdate > game.lastUpdate) {
                return;
            }
        } else {
            idSubject = new BehaviorSubject<Game>(null);
            this.gamesById.set(game.id, idSubject);
        }
        idSubject.next(game);
        this.classifyGame(game, cachedGame);
    }

    private classifyGame(game: Game, cachedGame?: Game): void {
        if (cachedGame) {
            this.removeClassifiedGame(cachedGame);
        }
        this.addClassifiedGame(game);
    }

    private addClassifiedGame(game: Game) {
        let classification = this.gameClassifier.classifyGame(game);
        if (this.gamesByClassification.has(classification)) {
            let subject = this.gamesByClassification.get(classification);
            let newGames = subject.getValue().slice();
            newGames.push(game);
            subject.next(newGames);
        }
    }

    private removeClassifiedGame(game: Game): void {
        let classification = this.gameClassifier.classifyGame(game);
        if (this.gamesByClassification.has(classification)) {
            let subject = this.gamesByClassification.get(classification);
            let classifiedGames = subject.getValue().slice();
            let indexToClear = classifiedGames.indexOf(game);
            if (indexToClear >= 0) {
                subject.next(classifiedGames.splice(indexToClear, 1));
            }
        }
    }

    private reclassifyGames(): void {
        let keys = this.gamesById.keys();
        while (1) {
            let id = keys.next();
            if (id.value) {
                let game = this.gamesById.get(id.value).getValue();
                this.classifyGame(game, game);
            }
            if (id.done) {
                break;
            }
        }
    }

    private initializeCategoryCaches(classifications: string[]) {
        this.gamesByClassification = new Map<string, BehaviorSubject<Game[]>>();
        classifications.forEach(c => {
            this.gamesByClassification.set(c, new BehaviorSubject<Game[]>([]));
        });
        this.gameCategoriesSubject.next(classifications);
    }

    private processConnectionStatus(status: boolean) {
        if (status) {
            this.updatesStarted();
        } else {
            this.updatesStopped();
        }
    }

    private updatesStopped(): void {
        this.gamesById.clear();
        this.isConnected = false;
    }

    private updatesStarted(): void {
        this.isConnected = true;
        this.http.get('/api/player/games')
            .map(response => response.json() as Object[])
            .map(gameObjects => {
                let games = [];
                gameObjects.forEach(gameObject => {
                    games.push(this.gameFactory.newGame(gameObject));
                });
                return games;
            })
            .subscribe(games => {
                games.forEach(game => {
                    this.processGame(game);
                }, error => {
                    //  TODO - general error handler
                    console.log(JSON.stringify(error));
                });
            });
    }
}
