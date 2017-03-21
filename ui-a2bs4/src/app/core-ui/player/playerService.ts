import {Injectable} from '@angular/core';
import {PlayerDetails} from './PlayerDetails';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class PlayerService {
    //  Unless dealing in admin functions use player
    //  In general, these two will be the same, unless an admin player
    //  switches to simulation mode - then loggedInPlayer will retain the admin details
    //  while player will switch to the simulated player
    player: Observable<PlayerDetails>;
    loggedInPlayer: Observable<PlayerDetails>;

    private playerSubject: BehaviorSubject<PlayerDetails> = new BehaviorSubject(new PlayerDetails());
    private loggedInSubject: BehaviorSubject<PlayerDetails> = new BehaviorSubject(new PlayerDetails());

    constructor() {
        this.player = Observable.from<PlayerDetails>(this.playerSubject);
        this.loggedInPlayer = Observable.from<PlayerDetails>(this.loggedInSubject);
        //  TODO - eliminate
        let timer = Observable.timer(2000, 1000);
        timer.subscribe(t => {
            let p = new PlayerDetails();
            p.displayName = 'Testing';
            p.source = 'Manual';
            p.adminUser = true;
            this.playerSubject.next(p);
            this.loggedInSubject.next(p);
        });
    }
}
