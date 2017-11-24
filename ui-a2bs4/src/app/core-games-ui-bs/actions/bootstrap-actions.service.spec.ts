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


@Component({
    selector: 'ngbd-modal-content',
    template: '<p class="error">{{errorMessage}}</p><p class="confirm">{{confirmMessage}}</p>'
})
export class MockReplacementComponent {
    @Input() errorMessage: string = '';
    @Input() confirmMessage: string = '';

    constructor() {
    }
}

class MockGameCacheService {
    putGame = jasmine.createSpy('putGame');
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
        this.result.then(null, () => {
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

describe('Service: bootstrap actions service', () => {
    let backend: MockBackend;
    let lastConnection: any;
    let modalService: MockModalService;
    let actionService: BootstrapActionsService;
    let router: MockRouter;
    let gameCache: MockGameCacheService;

    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            {provide: NgbModal, useClass: MockModalService},
            {provide: 'GameFactory', useClass: MockGameFactory},
            {provide: GameCacheService, useClass: MockGameCacheService},
            {provide: Router, useClass: MockRouter},
            Http,
            BootstrapActionsService
        ]);
        modalService = this.injector.get(NgbModal);
        actionService = this.injector.get(BootstrapActionsService);
        gameCache = this.injector.get(GameCacheService);
        router = this.injector.get(Router);
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
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

    describe('simple actions with success', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'successGame'});
        let action: string;

        afterEach(fakeAsync(() => {
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
            actionService.accept(game);
        });
    });

    describe('simple actions with failure', () => {
        let game: MultiPlayerGame = new MultiPlayerGame({'id': 'failureGame'});
        let action: string;

        afterEach(fakeAsync(() => {
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
        }));

        it('accepts game', () => {
            action = 'accept';
            actionService.accept(game);
        });
    });
});
