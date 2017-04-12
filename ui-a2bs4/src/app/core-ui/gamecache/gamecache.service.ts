import {MessageBusService} from '../messagebus/messagebus.service';
import {Inject, Injectable} from '@angular/core';
import {IGameClassifier} from './igameclassifier.service';
import {Game} from '../games/game.model';
import {Http} from '@angular/http';
import {IGameFactory} from '../games/igamefactory.service';

@Injectable()
export class GameCache {
    private gamesById: Map<string, Game> = new Map<string, Game>();
    private gamesByClassification: Map<string, Game[]> = new Map<string, Game[]>();

    private isConnected: boolean = false;

    constructor(private http: Http,
                private messageBus: MessageBusService,
                @Inject('GameFactory') private gameFactory: IGameFactory,
                @Inject('GameClassifier') private gameClassifier: IGameClassifier) {
        gameClassifier.getClassifications().subscribe(classifications => {
            if (classifications) {
                this.gamesByClassification = new Map<string, Game[]>();
                classifications.forEach(c => {
                    this.gamesByClassification.set(c, []);
                    //  In case classifier took longer than logging in to setup classifications
                    if (this.isConnected) {
                        this.atmosphereClosed();
                        this.atmosphereOpened();
                    }
                });
            }
        });

        this.messageBus.connectionStatus.subscribe(status => {
            if (status) {
                this.atmosphereOpened();
            } else {
                this.atmosphereClosed();
            }
        });
    }

    public getGame(id: string): Game {
        return this.gamesById.get(id);
    }


    private processGame(game: Game): void {
        if (this.gamesById.has(game.id)) {
            let cachedGame = this.gamesById.get(game.id);
            if (cachedGame.lastUpdate >= game.lastUpdate) {
                console.log('skipping stale update on game ' + game.id);
                return;
            }
            this.removeGame(cachedGame);
        }
        this.addGame(game);
    }

    private addGame(game: Game) {
        let classification = this.gameClassifier.classifyGame(game);
        if (this.gamesByClassification.has(classification)) {
            this.gamesByClassification.get(classification).unshift(game);
            // TODO - publish
        }
    }

    private removeGame(game: Game): void {
        this.gamesById.delete(game.id);
        let classification = this.gameClassifier.classifyGame(game);
        if (this.gamesByClassification.has(classification)) {
            let classifiedGames = this.gamesByClassification.get(classification);
            let indexToClear = classifiedGames.indexOf(game);
            this.gamesByClassification.set(classification, classifiedGames.splice(indexToClear, 1));
            //  TODO - publish
        }
    }

    private atmosphereClosed(): void {
        this.gamesById.clear();
        this.isConnected = false;
    }

    private atmosphereOpened(): void {
        this.isConnected = true;
        this.http.get('/api/player/games').subscribe(response => {
            if (this.isConnected) {
                let games = response.json() as Object[];
                games.forEach(gameObj => {
                    let game = Object.assign(this.gameFactory.newGame(), gameObj);
                    this.processGame(game);
                }, this);
            }
        });
    }
}
