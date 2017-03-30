import {Injectable} from '@angular/core';
import {Player} from './player.model';
import {Observable, BehaviorSubject} from 'rxjs';
import {Http} from '@angular/http';
import {MessageBusService} from '../messagebus/messagebus.service';

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

    //  TODO - not currently possible to test message bus updates when logged in != current
    constructor(private http: Http, private messageBus: MessageBusService) {
        this.player = Observable.from<Player>(this.playerSubject);
        this.loggedInPlayer = Observable.from<Player>(this.loggedInSubject);
        this.messageBus.playerUpdates.subscribe(player => {
            if (player.id === this.playerSubject.getValue().id) {
                console.log('player update ' + JSON.stringify(player));
                this.playerSubject.next(player);
            }
            if (player.id === this.loggedInSubject.getValue().id) {
                console.log('logged in update ' + JSON.stringify(player));
                this.loggedInSubject.next(player);
            }
        });
    }

    public loadLoggedInPlayer(): void {
        this.http.get('/api/security').subscribe(response => {
            let value = response.json() as Player;
            let fixed = new Player(value);
            this.playerSubject.next(fixed);
            this.loggedInSubject.next(fixed);
        });
    }
}
