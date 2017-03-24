import {Injectable} from '@angular/core';
import {Player} from './player.model';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class PlayerService {
    //  Unless dealing in admin functions use player
    //  In general, these two will be the same, unless an admin player
    //  switches to simulation mode - then loggedInPlayer will retain the admin details
    //  while player will switch to the simulated player
    player: Observable<Player>;
    loggedInPlayer: Observable<Player>;

    private playerSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());
    private loggedInSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());

    constructor() {
        this.player = Observable.from<Player>(this.playerSubject);
        this.loggedInPlayer = Observable.from<Player>(this.loggedInSubject);
        //  TODO - eliminate
        /*
        let timer = Observable.timer(2000, 1000);
        timer.subscribe(t => {
            let p = new Player();
            p.displayName = 'Testing';
            p.source = 'Manual';
            p.adminUser = true;
            this.playerSubject.next(p);
            this.loggedInSubject.next(p);
        });
        */
    }
}
