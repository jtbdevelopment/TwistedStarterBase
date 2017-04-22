import {PlayerService} from './player.service';
import {ConnectionBackend, BaseRequestOptions, Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReflectiveInjector} from '@angular/core';
import {tick, fakeAsync} from '@angular/core/testing';
import {Player} from './player.model';
import {MessageBusService} from '../messagebus/message-bus.service';
import {Router} from '@angular/router';

class MockRouter {
    navigateByUrl = jasmine.createSpy('nbu');
}

describe('Service: player service', () => {
    let currentPlayer: Player = null;
    let loggedInPlayer: Player = null;
    let playerService: PlayerService;
    let messageBus: MessageBusService;
    let backend: MockBackend;
    let lastConnection: any;
    let router: MockRouter;


    beforeEach(() => {
        currentPlayer = null;
        loggedInPlayer = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            {provide: Router, useClass: MockRouter},
            Http,
            MessageBusService,
            PlayerService,
        ]);
        playerService = this.injector.get(PlayerService);
        messageBus = this.injector.get(MessageBusService);
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        router = this.injector.get(Router) as MockRouter;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
        playerService.loggedInPlayer.subscribe(p => {
            loggedInPlayer = p;
        });
        playerService.player.subscribe(p => {
            currentPlayer = p;
        });
    });

    it('defaults to empty logged in and current player', () => {
        expect(currentPlayer).toBeDefined();
        expect(loggedInPlayer).toBeDefined();
    });

    it('loads logged in player', fakeAsync(() => {
        let loadedPlayer = {
            source: 'A source',
            sourceId: 'sidX',
            displayName: 'A player',
            adminUser: false,
            imageUrl: null,
            profileUrl: 'http://myprofile/1'
        };
        let expectedPlayer: Player = new Player(loadedPlayer);
        playerService.loadLoggedInPlayer();
        expect(lastConnection.request.url).toEqual('/api/security');
        lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(loadedPlayer)
        })));
        tick();
        expect(currentPlayer).toBeDefined();
        expect(loggedInPlayer).toBeDefined();
        //noinspection TypeScriptValidateTypes
        expect(currentPlayer).toEqual(loggedInPlayer);
        expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(expectedPlayer));
    }));

    describe('after loading logged in player', () => {
        let initiallyLoadedPlayer: Player;
        beforeEach(fakeAsync(() => {
            let loadedPlayer = {
                id: 'id',
                source: 'a source',
                sourceId: 'sidX',
                displayName: 'A Player',
                adminUser: false,
                imageUrl: 'http://image.png',
                profileUrl: null
            };
            initiallyLoadedPlayer = new Player(loadedPlayer);
            playerService.loadLoggedInPlayer();
            expect(lastConnection.request.url).toEqual('/api/security');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(loadedPlayer)
            })));
            tick();
        }));

        it('loads logged in player', () => {
            expect(currentPlayer).toBeDefined();
            expect(loggedInPlayer).toBeDefined();
            //noinspection TypeScriptValidateTypes
            expect(currentPlayer).toEqual(loggedInPlayer);
            expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(initiallyLoadedPlayer));
        });

        it('processes update on player when matches id', () => {
            let update = new Player(initiallyLoadedPlayer);
            update.profileUrl = 'a new profile';
            update.displayName = 'a new name';

            messageBus.playerUpdates.next(update);
            expect(currentPlayer).toBeDefined();
            expect(loggedInPlayer).toBeDefined();
            //noinspection TypeScriptValidateTypes
            expect(currentPlayer).toEqual(loggedInPlayer);
            expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(update));
        });

        it('ignores update on player when does not match id', () => {
            let update = new Player(initiallyLoadedPlayer);
            update.id = update.id + 'X';
            update.profileUrl = 'a new profile';
            update.displayName = 'a new name';

            messageBus.playerUpdates.next(update);
            expect(currentPlayer).toBeDefined();
            expect(loggedInPlayer).toBeDefined();
            //noinspection TypeScriptValidateTypes
            expect(currentPlayer).toEqual(loggedInPlayer);
            expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(initiallyLoadedPlayer));
        });

        it('successful logout posts and redirects', fakeAsync(() => {
            playerService.logout();
            expect(lastConnection.request.url).toEqual('/signout');
            lastConnection.mockRespond(new Response(new ResponseOptions({})));
            tick();
            expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(new Player()));
            expect(JSON.stringify(loggedInPlayer)).toEqual(JSON.stringify(new Player()));
            expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
            expect(router.navigateByUrl).toHaveBeenCalledWith('/signin');
        }));

        it('even failed logout posts and redirects', fakeAsync(() => {
            playerService.logout();
            expect(lastConnection.request.url).toEqual('/signout');
            lastConnection.mockError(new ResponseOptions({status: 500}));
            tick();
            expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(new Player()));
            expect(JSON.stringify(loggedInPlayer)).toEqual(JSON.stringify(new Player()));
            expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
            expect(router.navigateByUrl).toHaveBeenCalledWith('/signin');
        }));
    });
});
