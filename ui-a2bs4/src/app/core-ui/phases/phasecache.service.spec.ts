import {
    ConnectionBackend,
    BaseRequestOptions,
    Http,
    RequestOptions,
    ResponseOptions,
    Response,
    ResponseType
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReflectiveInjector} from '@angular/core';
import {MessageBusService} from '../messagebus/messagebus.service';
import {PhaseCache} from './phasecache.service';
import {Phase} from './phase.model';
import {fakeAsync, tick} from '@angular/core/testing';

describe('Service: phase cache service', () => {
    let phaseCache: PhaseCache;
    let messageBus: MessageBusService;
    let backend: MockBackend;
    let lastConnection: any;

    let currentPhases: Phase[];

    beforeEach(() => {
        currentPhases = null;
        lastConnection = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            PhaseCache,
            MessageBusService
        ]);
        phaseCache = this.injector.get(PhaseCache);
        messageBus = this.injector.get(MessageBusService);
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
        phaseCache.phases.subscribe((p) => {
            currentPhases = p;
        });
    });

    it('defaults to null phases', () => {
        expect(currentPhases).toBeNull();
        expect(lastConnection).toBeNull();
    });

    describe('loading phases', () => {
        let results = {
            'p1': ['d1', 'g1'],
            'p2': ['d2', 'g2'],
            'p4': ['d4', 'g4'],
            'p3': ['d3', 'g3']
        };

        afterEach(() => {
            expect(JSON.stringify(currentPhases)).toEqual(JSON.stringify([
                new Phase('p1', 'g1', 'd1'),
                new Phase('p2', 'g2', 'd2'),
                new Phase('p4', 'g4', 'd4'),
                new Phase('p3', 'g3', 'd3'),
            ]));
        });

        it('it requests phases on first request', fakeAsync(() => {
            expect(lastConnection).toBeNull();
            messageBus.connectionStatus.next(true);
            expect(lastConnection.request.url).toEqual('/api/phases');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(results)
            })));
            tick();
        }));

        it('it does not re-request after first call', fakeAsync(() => {
            expect(lastConnection).toBeNull();
            messageBus.connectionStatus.next(true);
            expect(lastConnection.request.url).toEqual('/api/phases');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(results)
            })));
            tick();

            lastConnection = null;
            messageBus.connectionStatus.next(false);
            messageBus.connectionStatus.next(true);
            expect(lastConnection).toBeNull();
        }));

        it('it does re-request after first call if first fails', fakeAsync(() => {
            expect(lastConnection).toBeNull();
            messageBus.connectionStatus.next(true);
            expect(lastConnection.request.url).toEqual('/api/phases');
            lastConnection.mockError(new ResponseOptions({
                type: ResponseType.Error,
                status: 404
            }));
            tick();

            expect(currentPhases).toBeNull();
            lastConnection = null;
            messageBus.connectionStatus.next(false);
            messageBus.connectionStatus.next(true);
            expect(lastConnection.request.url).toEqual('/api/phases');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(results)
            })));
            tick();
        }));
    });

    /*

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
     console.warn(initiallyLoadedPlayer.id);
     update.id = update.id + 'X';
     console.warn(initiallyLoadedPlayer.id);
     update.profileUrl = 'a new profile';
     update.displayName = 'a new name';

     messageBus.playerUpdates.next(update);
     expect(currentPlayer).toBeDefined();
     expect(loggedInPlayer).toBeDefined();
     //noinspection TypeScriptValidateTypes
     expect(currentPlayer).toEqual(loggedInPlayer);
     expect(JSON.stringify(currentPlayer)).toEqual(JSON.stringify(initiallyLoadedPlayer));
     });
     });
     */
});
