import {PlayerService} from './player.service';
import {ConnectionBackend, BaseRequestOptions, Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReflectiveInjector} from '@angular/core';
import {tick, fakeAsync} from '@angular/core/testing';
import {Player} from './player.model';
describe('Service: player service', () => {
    this.current = null;
    this.loggedIn = null;
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
        this.service.loggedInPlayer.subscribe(p => {
            this.loggedIn = p;
        });
        this.service.player.subscribe(p => {
            this.current = p;
        });
    });

    it('defaults to empty logged in and current player', () => {
        expect(this.current).toBeDefined();
        expect(this.loggedIn).toBeDefined();
    });

    it('loads logged in player', fakeAsync(() => {
        let expectedPlayer: Player = new Player();
        expectedPlayer.source = 'A Source';
        expectedPlayer.adminUser = false;
        expectedPlayer.displayName = 'A Player';
        expectedPlayer.imageUrl = 'http://image.png';
        expectedPlayer.profileUrl = null;
        let loadedPlayer = {
            source: expectedPlayer.source,
            sourceId: 'X',
            displayName: expectedPlayer.displayName,
            adminUser: expectedPlayer.adminUser,
            imageUrl: expectedPlayer.imageUrl,
            profileUrl: expectedPlayer.profileUrl
        };
        this.service.loadLoggedInPlayer();
        expect(this.lastConnection.request.url).toEqual('/api/security');
        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(loadedPlayer)
        })));
        tick();
        expect(this.current).toBeDefined();
        expect(this.loggedIn).toBeDefined();
        expect(this.current).toEqual(this.loggedIn);
        expect(JSON.stringify(this.current)).toEqual(JSON.stringify(expectedPlayer));
    }));
});
