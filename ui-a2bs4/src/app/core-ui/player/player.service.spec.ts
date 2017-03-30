import {PlayerService} from './player.service';
import {ConnectionBackend, BaseRequestOptions, Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReflectiveInjector} from '@angular/core';
import {tick, fakeAsync} from '@angular/core/testing';
import {Player} from './player.model';
import {MessageBusService} from '../messagebus/messagebus.service';

describe('Service: player service', () => {
    let currentPlayer: Player = null;
    let loggedInPlayer: Player = null;
    let playerService: PlayerService;
    let messageBus: MessageBusService;
    let backend: MockBackend;
    let lastConnection: any;


    beforeEach(() => {
        currentPlayer = null;
        loggedInPlayer = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            MessageBusService,
            PlayerService,
        ]);
        playerService = this.injector.get(PlayerService);
        messageBus = this.injector.get(MessageBusService);
        backend = this.injector.get(ConnectionBackend) as MockBackend;
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
        playerService.loadLoggedInPlayer();
        expect(lastConnection.request.url).toEqual('/api/security');
        lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(loadedPlayer)
        })));
        tick();
        expect(currentPlayer).toBeDefined();
        expect(loggedInPlayer).toBeDefined();
        expect(currentPlayer).toEqual(loggedInPlayer);
        expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(expectedPlayer));
    }));

    describe('after loading logged in player', () => {
        let initiallyLoadedPlayer: Player = new Player();
        beforeEach(fakeAsync(() => {
            initiallyLoadedPlayer.source = 'A Source';
            initiallyLoadedPlayer.adminUser = false;
            initiallyLoadedPlayer.displayName = 'A Player';
            initiallyLoadedPlayer.imageUrl = 'http://image.png';
            initiallyLoadedPlayer.profileUrl = null;
            let loadedPlayer = {
                source: initiallyLoadedPlayer.source,
                sourceId: 'X',
                displayName: initiallyLoadedPlayer.displayName,
                adminUser: initiallyLoadedPlayer.adminUser,
                imageUrl: initiallyLoadedPlayer.imageUrl,
                profileUrl: initiallyLoadedPlayer.profileUrl
            };
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
            expect(currentPlayer).toEqual(loggedInPlayer);
            expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(initiallyLoadedPlayer));
        });
    });
});
