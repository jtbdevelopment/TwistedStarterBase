import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Component, ReflectiveInjector} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BootstrapActionsService} from './bootstrap-actions.service';
import {GameFactory} from '../../core-games-ui/games/gamefactory.serviceinterface';
import {MultiPlayerGame} from '../../core-games-ui/games/multi-player-game.model';
import {GameCacheService} from '../../core-games-ui/gamecache/game-cache.service';
import {Router} from '@angular/router';


@Component({
    selector: 'ngbd-modal-content',
    template: require('./default-version-notes.component.html')
})
export class MockReplacementComponent {
    constructor() {
    }
}

class MockGameCacheService {
    putGame = jasmine.createSpy('putGame');
}

class MockModalService {
    open = jasmine.createSpy('open');
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

});
