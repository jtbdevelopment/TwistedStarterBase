import {Injectable} from '@angular/core';
import {Player} from './player.model';
import {Observable, BehaviorSubject} from 'rxjs';
import {Http} from '@angular/http';

@Injectable()
export class PlayerService {
    //  Unless dealing in admin functions use player
    //  In general, these two will be the same unless an admin player
    //  switches to simulation mode - then loggedInPlayer will retain the admin details
    //  while player will switch to the simulated player
    player: Observable<Player>;
    loggedInPlayer: Observable<Player>;

    private playerSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());
    private loggedInSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());

    constructor(private http: Http) {
        this.player = Observable.from<Player>(this.playerSubject);
        this.loggedInPlayer = Observable.from<Player>(this.loggedInSubject);
        this.player.subscribe(p => {
            console.log(p);
        });
        this.loggedInPlayer.subscribe(p => {
            console.log(p);
        });
    }

    public loadLoggedInPlayer(): void {
        this.http.get('/api/security').subscribe(response => {
            let value = response.json() as Player;
            this.playerSubject.next(value);
            this.loggedInSubject.next(value);
        });
    }
}
