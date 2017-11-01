import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {GameFactory} from '../../core-ui/games/gamefactory.serviceinterface';
import {Game} from '../../core-ui/games/game.model';
import {Observable} from 'rxjs/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GameCacheService} from '../../core-ui/gamecache/game-cache.service';
import {Subject} from 'rxjs/Subject';
import {DefaultActionErrorComponent} from './default-action-error.component';
import {DefaultActionConfirmComponent} from './default-action-confirm.component';

@Injectable()
export class BootstrapActionsService {

    private errorModal: any;

    private confirmModal: any;

    constructor(private http: Http,
                @Inject('GameFactory') private gameFactory: GameFactory,
                private modalService: NgbModal,
                private gameCache: GameCacheService) {
        this.errorModal = DefaultActionErrorComponent;
        this.confirmModal = DefaultActionConfirmComponent
    }

    public setCofirmComponent(modal: any) {
        this.confirmModal = modal;
    }

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
                //  TODO
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
            //  TODO
            alert('New game ' + game.id);
        })
    }

    public accept(game: Game): void {
        //  TODO - ad
        this.wrapAction(this.httpRequest(game, 'accept'));
    }

    public reject(game: Game): void {
        this.wrapActionWithConfirm('Reject this game!', this.httpRequest(game, 'reject'));
    }

    public quit(game: Game): void {
        this.wrapActionWithConfirm('Quit this game!', this.httpRequest(game, 'reject'));
    }

    public rematch(game: Game): void {
        //  TODO - ad
        this.wrapAction(this.httpRequest(game, 'rematch')).subscribe((game: Game) => {
            //  TODO
            alert('Rematch game ' + game.id);
        });
    }

    public declineRematch(game: Game): void {
        //  TODO - ad
        this.wrapAction(this.httpRequest(game, 'rematch'));
    }

    private httpRequest(game: Game, action: string): Observable<Response> {
        return this.http.put(this.gameURL(game) + action, "");
    }

    private gameURL(game: Game): string {
        return '/api/player/game/' + game.id + '/';
    }
}

