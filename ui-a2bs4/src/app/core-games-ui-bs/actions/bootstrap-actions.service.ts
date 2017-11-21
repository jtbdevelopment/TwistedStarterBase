import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {GameFactory} from '../../core-games-ui/games/gamefactory.serviceinterface';
import {Game} from '../../core-games-ui/games/game.model';
import {Observable} from 'rxjs/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GameCacheService} from '../../core-games-ui/gamecache/game-cache.service';
import {Subject} from 'rxjs/Subject';
import {DefaultActionErrorComponent} from './default-action-error.component';
import {DefaultActionConfirmComponent} from './default-action-confirm.component';
import {Router} from '@angular/router';

@Injectable()
export class BootstrapActionsService {

    private errorModal: any;

    private confirmModal: any;

    constructor(private http: Http,
                private router: Router,
                @Inject('GameFactory') private gameFactory: GameFactory,
                private modalService: NgbModal,
                private gameCache: GameCacheService) {
        this.errorModal = DefaultActionErrorComponent;
        this.confirmModal = DefaultActionConfirmComponent;
    }

    /**
     * Modal must take error message public confirmMessage string in inner model
     * @param modal
     */
    public setCofirmComponent(modal: any) {
        this.confirmModal = modal;
    }

    /**
     * Modal must take error message public errorMessage string in inner model
     * @param modal
     */
    public setErrorComponent(modal: any) {
        this.errorModal = modal;
    }

    public wrapAction(httpObservable: Observable<Response>): Observable<Game> {
        let observable: Subject<Game> = new Subject<Game>();
        //  TODO - disable screen
        httpObservable
            .map(response => response.json())
            .map(json => this.gameFactory.newGame(json))
            .subscribe(game => {
                this.gameCache.putGame(game);
                observable.next(game);
            }, error => {
                console.log(JSON.stringify(error));
                let ngbModalRef = this.modalService.open(this.errorModal);
                ngbModalRef.componentInstance.errorMessage = error.text();
                observable.complete();
            });
        return observable;
    }

    public wrapActionWithConfirm(message: string, httpObservable: Observable<Response>): Observable<Game> {
        let observable: Subject<Game> = new Subject<Game>();
        let ngbModalRef = this.modalService.open(this.confirmModal);
        ngbModalRef.componentInstance.confirmMessage = message;
        ngbModalRef.result.then(() => {
            this.wrapAction(httpObservable).subscribe((game: Game) => {
                observable.next(game);
            }, () => {
                observable.complete();
            });
        }, () => {
            observable.complete();
        });
        return observable;
    }

    public newGame(options: any): void {
        //  TODO - ad
        this.wrapAction(this.http.post('/api/player/new', options)).subscribe((game: Game) => {
            this.router.navigateByUrl(game.standardLink());
        });
    }

    public accept(game: Game): void {
        //  TODO - ad
        this.wrapAction(this.gameAction(game, 'accept'));
    }

    public reject(game: Game): void {
        this.wrapActionWithConfirm('Reject this game!', this.gameAction(game, 'reject'));
    }

    public quit(game: Game): void {
        this.wrapActionWithConfirm('Quit this game!', this.gameAction(game, 'reject'));
    }

    public rematch(game: Game): void {
        //  TODO - ad
        this.wrapAction(this.gameAction(game, 'rematch')).subscribe((game: Game) => {
            this.router.navigateByUrl(game.standardLink());
        });
    }

    public declineRematch(game: Game): void {
        //  TODO - ad
        this.wrapAction(this.gameAction(game, 'rematch'));
    }

    public gameAction(game: Game, action: string, body?: string): Observable<Response> {
        return this.http.put(this.gameURL(game) + action, body);
    }

    public gameURL(game: Game): string {
        return '/api/player/game/' + game.id + '/';
    }
}
