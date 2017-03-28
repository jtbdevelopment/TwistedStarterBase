import {PlayerService} from './player.service';
import {Player} from './player.model';
import {ConnectionBackend, BaseRequestOptions, Http, RequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReflectiveInjector} from '@angular/core';
describe('Service: player service', () => {
    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            PlayerService,
        ]);
        this.service = this.injector.get(PlayerService);
        this.backend = this.injector.get(ConnectionBackend) as MockBackend;
        this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
    });

    it('defaults to empty logged in and current player', () => {
        let current: Player;
        let loggedIn: Player;
        this.service.loggedInPlayer.subscribe(p => {
            loggedIn = p;
        });
        this.service.player.subscribe(p => {
            current = p;
        });

        expect(current).toBeDefined();
        expect(loggedIn).toBeDefined();
    });

    it('loads logged in player', () => {

    });
});
