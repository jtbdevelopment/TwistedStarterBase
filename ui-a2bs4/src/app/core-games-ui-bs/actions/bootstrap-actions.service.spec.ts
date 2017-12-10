import {
    BaseRequestOptions,
    ConnectionBackend,
    Http,
    RequestMethod,
    RequestOptions,
    Response,
    ResponseOptions
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Component, Input, ReflectiveInjector} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BootstrapActionsService} from './bootstrap-actions.service';
import {GameFactory} from '../../core-games-ui/games/gamefactory.serviceinterface';
import {MultiPlayerGame} from '../../core-games-ui/games/multi-player-game.model';
import {GameCacheService} from '../../core-games-ui/gamecache/game-cache.service';
import {Router} from '@angular/router';
import {fakeAsync, tick} from '@angular/core/testing';
import {DefaultActionErrorComponent} from './default-action-error.component';
import {DefaultActionConfirmComponent} from './default-action-confirm.component';
import {BootstrapAdsService} from '../ads/bootstrap-ads.service';
import {BootstrapBackdropService} from '../backdrop/bootstrap-backdrop.service';


@Component({
    selector: 'ngbd-modal-content',
    template: '<p class="error">{{errorMessage}}</p><p class="confirm">{{confirmMessage}}</p>'
})
export class MockReplacementComponent {
    @Input() errorMessage: string = '';
    @Input() confirmMessage: string = '';
}

class MockGameCacheService {
    putGame = jasmine.createSpy('putGame');
}

class MockAdService {
    public resolve: (reason?: any) => void;
    public reject: (reason?: any) => void;
    public lastPromise: Promise<any>;

    public showAdPopup(): Promise<any> {
        this.lastPromise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });

        return this.lastPromise;
    }

}

class MockModalRef {
    public component: any;
    public componentInstance: Object = {};
    public result: Promise<any>;

    private _resolve: (result?: any) => void;
    private _reject: (reason?: any) => void;

    constructor() {
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }


    close(result?: any): void {
        this._resolve(result);
    }

    dismiss(reason?: any): void {
        this._reject(reason);
    }

}

class MockModalService {
    public lastStub: MockModalRef;

    public open(component: any): MockModalRef {
        this.lastStub = new MockModalRef();
        this.lastStub.component = component;
        return this.lastStub;
    }
}

class MockGameFactory implements GameFactory {
    static lastGame: MultiPlayerGame;

    public newGame(original?: Object): any {
        MockGameFactory.lastGame = new MultiPlayerGame(original);
        return MockGameFactory.lastGame;
    }
}

class MockRouter {
    navigateByUrl = jasmine.createSpy('nbu');
}

class MockBackdrop {
    addBackdrop = jasmine.createSpy('addbd');
    removeBackdrop = jasmine.createSpy('removebd');
}

describe('Service: bootstrap actions service', () => {
    let backend: MockBackend;
    let lastConnection: any;
    let modalService: MockModalService;
    let actionService: BootstrapActionsService;
    let router: MockRouter;
    let gameCache: MockGameCacheService;
    let ads: MockAdService;
    let backdrop: MockBackdrop;

    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            {provide: NgbModal, useClass: MockModalService},
            {provide: 'GameFactory', useClass: MockGameFactory},
            {provide: GameCacheService, useClass: MockGameCacheService},
            {provide: Router, useClass: MockRouter},
            {provide: BootstrapAdsService, useClass: MockAdService},
            {provide: BootstrapBackdropService, useClass: MockBackdrop},
            Http,
            BootstrapActionsService
        ]);
        modalService = this.injector.get(NgbModal);
        actionService = this.injector.get(BootstrapActionsService);
        gameCache = this.injector.get(GameCacheService);
        router = this.injector.get(Router);
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        ads = this.injector.get(BootstrapAdsService) as MockAdService;
        backdrop = this.injector.get(BootstrapBackdropService) as MockBackdrop;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
        lastConnection = undefined;
    });

    it('game url', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({id: 'myId'});
        expect(actionService.gameURL(game)).toEqual('/api/player/game/myId/');
    });

    it('game action with no body', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'noBody'});
        let put = actionService.gameAction(game, 'test');
        expect(lastConnection.request.url).toEqual('/api/player/game/noBody/test');
        expect(lastConnection.request.method).toEqual(RequestMethod.Put);
        expect(lastConnection.request._body).toBeNull();
    });

    it('game action with body', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'body'});
        let body = JSON.stringify({flag: false, otherOption: 'value'});
        let put = actionService.gameAction(game, 'testBody', body);
        expect(lastConnection.request.url).toEqual('/api/player/game/body/testBody');
        expect(lastConnection.request.method).toEqual(RequestMethod.Put);
        expect(lastConnection.request._body).toEqual(body);
    });

    describe('simple accept actions with ads with success', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'successGame'});
        let action: string;

        afterEach(fakeAsync(() => {
            expect(ads.lastPromise).toBeDefined();
            expect(lastConnection).toBeUndefined();
            ads.resolve();
            tick();
            expect(lastConnection.request.url).toEqual('/api/player/game/successGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();
            let gameResponse = new MultiPlayerGame({id: 'successGame2', gamePhase: 'aPhase'});
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(gameResponse)
            })));
            tick();
            expect(gameCache.putGame).toHaveBeenCalledWith(gameResponse);
        }));

        it('accepts game', () => {
            action = 'accept';
            expect(ads.lastPromise).toBeUndefined();
            actionService.accept(game);
        });
    });

    describe('rematch game with ads with success', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'successGame'});
        let action: string;

        afterEach(fakeAsync(() => {
            expect(ads.lastPromise).toBeDefined();
            expect(lastConnection).toBeUndefined();
            ads.resolve();
            tick();
            expect(lastConnection.request.url).toEqual('/api/player/game/successGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();
            let gameResponse = new MultiPlayerGame({id: 'successGame2', gamePhase: 'aPhase'});
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(gameResponse)
            })));
            tick();
            expect(gameCache.putGame).toHaveBeenCalledWith(gameResponse);
            expect(router.navigateByUrl).toHaveBeenCalledWith(gameResponse.standardLink());
        }));

        it('rematch game', () => {
            action = 'rematch';
            expect(ads.lastPromise).toBeUndefined();
            actionService.rematch(game);
        });
    });

    describe('new game with ads with success', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'successGame'});
        let options: Object;

        afterEach(fakeAsync(() => {
            expect(ads.lastPromise).toBeDefined();
            expect(lastConnection).toBeUndefined();
            ads.resolve();
            tick();
            expect(lastConnection.request.url).toEqual('/api/player/new');
            expect(lastConnection.request.method).toEqual(RequestMethod.Post);
            expect(lastConnection.request._body).toEqual(options);
            let gameResponse = new MultiPlayerGame({id: 'newGame', gamePhase: 'newPhase'});
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(gameResponse)
            })));
            tick();
            expect(gameCache.putGame).toHaveBeenCalledWith(gameResponse);
            expect(router.navigateByUrl).toHaveBeenCalledWith(gameResponse.standardLink());
        }));

        it('rematch game', () => {
            expect(ads.lastPromise).toBeUndefined();
            options = {a: 1, b: '32', c: ['something', 'somethin']};
            actionService.newGame(options);
        });
    });

    describe('simple accept actions with failure', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'failureGame'});
        let action: string;

        afterEach(fakeAsync(() => {
            expect(ads.lastPromise).toBeDefined();
            expect(lastConnection).toBeUndefined();
            ads.resolve();
            tick();
            expect(lastConnection.request.url).toEqual('/api/player/game/failureGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();
            lastConnection.mockError(new Response(new ResponseOptions({
                status: 402,
                body: 'something is not right'
            })));
            tick();
            expect(modalService.lastStub).toBeDefined();
            expect(modalService.lastStub.component).toEqual(DefaultActionErrorComponent);
            expect(modalService.lastStub.componentInstance['errorMessage']).toEqual('something is not right');
            expect(gameCache.putGame).not.toHaveBeenCalled();
        }));

        it('accepts game', () => {
            action = 'accept';
            actionService.accept(game);
        });
    });

    describe('rematch game with failure', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'failureGame'});
        let action: string;

        afterEach(fakeAsync(() => {
            expect(ads.lastPromise).toBeDefined();
            expect(lastConnection).toBeUndefined();
            ads.resolve();
            tick();
            expect(lastConnection.request.url).toEqual('/api/player/game/failureGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();
            lastConnection.mockError(new Response(new ResponseOptions({
                status: 402,
                body: 'something is not right'
            })));
            tick();
            expect(modalService.lastStub).toBeDefined();
            expect(modalService.lastStub.component).toEqual(DefaultActionErrorComponent);
            expect(modalService.lastStub.componentInstance['errorMessage']).toEqual('something is not right');
            expect(gameCache.putGame).not.toHaveBeenCalled();
            expect(router.navigateByUrl).not.toHaveBeenCalled();
        }));

        it('rematch game', () => {
            action = 'rematch';
            expect(ads.lastPromise).toBeUndefined();
            actionService.rematch(game);
        });
    });

    describe('simple accept with failure and custom error', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'failureGame'});
        let action: string;

        beforeEach(() => {
            actionService.setErrorComponent(MockReplacementComponent);
        });

        afterEach(fakeAsync(() => {
            expect(ads.lastPromise).toBeDefined();
            expect(lastConnection).toBeUndefined();
            ads.resolve();
            tick();
            expect(lastConnection.request.url).toEqual('/api/player/game/failureGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();
            lastConnection.mockError(new Response(new ResponseOptions({
                status: 402,
                body: 'something is not right'
            })));
            tick();
            expect(modalService.lastStub).toBeDefined();
            expect(modalService.lastStub.component).toEqual(MockReplacementComponent);
            expect(modalService.lastStub.componentInstance['errorMessage']).toEqual('something is not right');
            expect(gameCache.putGame).not.toHaveBeenCalled();
        }));

        it('accepts game', () => {
            action = 'accept';
            actionService.accept(game);
        });
    });

    describe('confirming actions with success', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'successGame'});
        let action: string;
        let confirmMessage: string;

        afterEach(fakeAsync(() => {
            expect(modalService.lastStub).toBeDefined();
            expect(modalService.lastStub.component).toEqual(DefaultActionConfirmComponent);
            expect(modalService.lastStub.componentInstance['confirmMessage']).toEqual(confirmMessage);

            modalService.lastStub.close();
            tick();

            expect(lastConnection.request.url).toEqual('/api/player/game/successGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();
            let gameResponse = new MultiPlayerGame({id: 'successGame2', gamePhase: 'aPhase'});
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(gameResponse)
            })));
            tick();
            expect(gameCache.putGame).toHaveBeenCalledWith(gameResponse);
        }));

        it('reject game', () => {
            action = 'reject';
            confirmMessage = 'Reject this game!';
            actionService.reject(game);
        });

        it('quit game', () => {
            action = 'quit';
            confirmMessage = 'Quit this game!';
            actionService.quit(game);
        });

        it('end series game', () => {
            action = 'endRematch';
            confirmMessage = 'End this series?';
            actionService.declineRematch(game);
        });
    });

    describe('confirming actions with error', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'successGame'});
        let action: string;
        let confirmMessage: string;

        afterEach(fakeAsync(() => {
            expect(modalService.lastStub).toBeDefined();
            expect(modalService.lastStub.component).toEqual(DefaultActionConfirmComponent);
            expect(modalService.lastStub.componentInstance['confirmMessage']).toEqual(confirmMessage);

            modalService.lastStub.close();
            tick();

            expect(lastConnection.request.url).toEqual('/api/player/game/successGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();
            lastConnection.mockError(new Response(new ResponseOptions({
                status: 402,
                body: 'something is not right'
            })));
            tick();
            expect(modalService.lastStub).toBeDefined();
            expect(modalService.lastStub.component).toEqual(DefaultActionErrorComponent);
            expect(modalService.lastStub.componentInstance['errorMessage']).toEqual('something is not right');
            expect(gameCache.putGame).not.toHaveBeenCalled();
        }));

        it('reject game', () => {
            action = 'reject';
            confirmMessage = 'Reject this game!';
            actionService.reject(game);
        });

        it('quit game', () => {
            action = 'quit';
            confirmMessage = 'Quit this game!';
            actionService.quit(game);
        });

        it('end series game', () => {
            action = 'endRematch';
            confirmMessage = 'End this series?';
            actionService.declineRematch(game);
        });
    });

    describe('cancelling actions with success', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'successGame'});
        let action: string;
        let confirmMessage: string;

        afterEach(fakeAsync(() => {
            expect(modalService.lastStub).toBeDefined();
            expect(modalService.lastStub.component).toEqual(DefaultActionConfirmComponent);
            expect(modalService.lastStub.componentInstance['confirmMessage']).toEqual(confirmMessage);

            modalService.lastStub.dismiss();
            tick();

            expect(lastConnection.request.url).toEqual('/api/player/game/successGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();

            //  Shouldn't be called but confirming it wouldnt be processed even if it was
            let gameResponse = new MultiPlayerGame({id: 'successGame2', gamePhase: 'aPhase'});
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(gameResponse)
            })));
            tick();
            expect(gameCache.putGame).not.toHaveBeenCalled();
        }));

        it('reject game', () => {
            action = 'reject';
            confirmMessage = 'Reject this game!';
            actionService.reject(game);
        });

        it('quit game', () => {
            action = 'quit';
            confirmMessage = 'Quit this game!';
            actionService.quit(game);
        });

        it('end series game', () => {
            action = 'endRematch';
            confirmMessage = 'End this series?';
            actionService.declineRematch(game);
        });
    });

    describe('confirming actions with custom confirm', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'successGame'});
        let action: string;
        let confirmMessage: string;

        beforeEach(() => {
            actionService.setCofirmComponent(MockReplacementComponent);
        });

        afterEach(fakeAsync(() => {
            expect(modalService.lastStub).toBeDefined();
            expect(modalService.lastStub.component).toEqual(MockReplacementComponent);
            expect(modalService.lastStub.componentInstance['confirmMessage']).toEqual(confirmMessage);

            modalService.lastStub.close();
            tick();

            expect(lastConnection.request.url).toEqual('/api/player/game/successGame/' + action);
            expect(lastConnection.request.method).toEqual(RequestMethod.Put);
            expect(lastConnection.request._body).toBeNull();
            let gameResponse = new MultiPlayerGame({id: 'successGame2', gamePhase: 'aPhase'});
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(gameResponse)
            })));
            tick();
            expect(gameCache.putGame).toHaveBeenCalledWith(gameResponse);
        }));

        it('reject game', () => {
            action = 'reject';
            confirmMessage = 'Reject this game!';
            actionService.reject(game);
        });
    });
});
