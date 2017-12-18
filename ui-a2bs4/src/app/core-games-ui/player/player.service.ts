import {Injectable} from '@angular/core';
import {Player} from './player.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {MessageBusService} from '../messagebus/message-bus.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

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

    constructor(private http: HttpClient,
                private messageBus: MessageBusService,
                private router: Router) {
        this.player = Observable.from<Player>(this.playerSubject);
        this.loggedInPlayer = Observable.from<Player>(this.loggedInSubject);
        this.messageBus.playerUpdates.subscribe(player => {
            if (player.id === this.playerSubject.getValue().id) {
                this.playerSubject.next(player);
            }
            if (player.id === this.loggedInSubject.getValue().id) {
                this.loggedInSubject.next(player);
            }
        });
    }

    public loadLoggedInPlayer(): void {
        this.http.get('/api/security')
            .map(json => {
                let loaded = new Player(json);
                return loaded;
            })
            .subscribe(loaded => {
                    this.playerSubject.next(loaded);
                    this.loggedInSubject.next(loaded);
                },
                error => {
                    //  TODO - general error handler
                    console.log(JSON.stringify(error));
                });
    }

    public simulateUser(id: string): void {
        this.http.put('/api/player/admin/' + id, {})
            .subscribe(json => {
                this.playerSubject.next(new Player(json));
            }, error => {
                //  TODO - general error handler
                console.log(JSON.stringify(error));
            });
    }

    public logout(): void {
        this.http.post('/signout', null).subscribe(() => {
            this.resetPlayer();
        }, error => {
            console.log(JSON.stringify(error));
            this.resetPlayer();
        });
    }

    private resetPlayer(): void {
        this.loggedInSubject.next(new Player());
        this.playerSubject.next(new Player());
        this.messageBus.playerUpdates.next(new Player());
        this.router.navigateByUrl('/signin');
    }
}
