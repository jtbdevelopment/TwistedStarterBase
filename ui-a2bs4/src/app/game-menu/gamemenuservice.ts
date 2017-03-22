import {Observable, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class GameMenuService {
    public showGames: Observable<boolean>;

    private showGamesSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

    constructor() {
        this.showGames = Observable.from<boolean>(this.showGamesSubject);
    }

    setShowGames(show: boolean): void {
        this.showGamesSubject.next(show);
    }

    getShowGames(): boolean {
        return this.showGamesSubject.getValue();
    }
}