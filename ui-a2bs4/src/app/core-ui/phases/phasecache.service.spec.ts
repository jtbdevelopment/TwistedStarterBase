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

    it('defaults to empty phases', () => {
        expect(currentPhases).toEqual([]);
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

            expect(currentPhases).toEqual([]);
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
});
