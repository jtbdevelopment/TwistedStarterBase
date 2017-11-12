import {
    BaseRequestOptions,
    ConnectionBackend,
    Http,
    RequestOptions,
    Response,
    ResponseOptions,
    ResponseType
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReflectiveInjector} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {MessageBusService} from '../messagebus/message-bus.service';
import {FeatureCacheService} from './feature-cache.service';
import {Feature} from './feature.model';
import {FeatureOption} from './feature-option.model';
import {FeatureGroup} from './feature-group.model';

describe('Service: feature cache service', () => {
    let featureService: FeatureCacheService;
    let messageBus: MessageBusService;
    let backend: MockBackend;
    let lastConnection: any;

    let currentFeatures: FeatureGroup[];

    beforeEach(() => {
        currentFeatures = null;
        lastConnection = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            FeatureCacheService,
            MessageBusService
        ]);
        featureService = this.injector.get(FeatureCacheService);
        messageBus = this.injector.get(MessageBusService);
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
        featureService.features.subscribe((f) => {
            currentFeatures = f;
        });
    });

    it('defaults to empty features', () => {
        expect(currentFeatures).toEqual([]);
        expect(lastConnection).toBeNull();
    });

    describe('loading features', () => {
        let results = [
            {
                'feature': {
                    'groupType': 'Difficulty',
                    'feature': 'Option1',
                    'group': 'Option1',
                    'label': 'Option 1',
                    'description': 'Some sort of option.'
                },
                'options': [
                    {
                        'groupType': 'Difficulty',
                        'feature': 'Choice1',
                        'group': 'Option1',
                        'label': 'Choice1',
                        'description': 'Tada!'
                    },
                    {
                        'groupType': 'Difficulty',
                        'feature': 'Choice2',
                        'group': 'Option1',
                        'label': 'Two',
                        'description': 'Super info!'
                    },
                    {
                        'groupType': 'Difficulty',
                        'feature': 'Choice3',
                        'group': 'Option1',
                        'label': 'Choice3',
                        'description': 'Don\'t pick me.'
                    }
                ]
            },
            {
                'feature': {
                    'groupType': 'Difficulty',
                    'feature': 'Option2',
                    'group': 'Option2',
                    'label': 'Option 2',
                    'description': 'Some sort of option.'
                },
                'options': [
                    {
                        'groupType': 'Difficulty',
                        'feature': 'Option2Yes',
                        'group': 'Option2',
                        'label': 'Yes',
                        'description': 'Turns on cool feature!'
                    },
                    {
                        'groupType': 'Difficulty',
                        'feature': 'Option2No',
                        'group': 'Option2',
                        'label': 'No',
                        'description': 'Game will suck!'
                    }
                ]
            },
            {
                'feature': {
                    'groupType': 'MultiPlayer',
                    'feature': 'Option3',
                    'group': 'Option3',
                    'label': 'Multiplayer Option',
                    'description': 'Some sort of multi-player option.'
                },
                'options': [
                    {
                        'groupType': 'MultiPlayer',
                        'feature': 'Solo',
                        'group': 'Option3',
                        'label': 'Solo',
                        'description': 'Make more friends!'
                    },
                    {
                        'groupType': 'MultiPlayer',
                        'feature': 'Collaborate',
                        'group': 'Option3',
                        'label': 'Friends',
                        'description': 'Play together'
                    },
                    {
                        'groupType': 'MultiPlayer',
                        'feature': 'Compete',
                        'group': 'Option3',
                        'label': 'Enemies',
                        'description': 'Play head to head.'
                    }
                ]
            }
        ];

        afterEach(() => {
            let expectedGroups = [
                new FeatureGroup('Difficulty'),
                new FeatureGroup('MultiPlayer')
            ];
            expectedGroups[0].features = [
                new Feature('Option1', 'Option 1', 'Some sort of option.'),
                new Feature('Option2', 'Option 2', 'Some sort of option.'),
            ];
            expectedGroups[1].features = [
                new Feature('Option3', 'Multiplayer Option', 'Some sort of multi-player option.')
            ];
            expectedGroups[0].features[0].options = [
                new FeatureOption('Choice1', 'Choice1', 'Tada!'),
                new FeatureOption('Choice2', 'Two', 'Super info!'),
                new FeatureOption('Choice3', 'Choice3', 'Don\'t pick me.'),
            ];
            expectedGroups[0].features[1].options = [
                new FeatureOption('Option2Yes', 'Yes', 'Turns on cool feature!'),
                new FeatureOption('Option2No', 'No', 'Game will suck!'),
            ];
            expectedGroups[1].features[0].options = [
                new FeatureOption('Solo', 'Solo', 'Make more friends!'),
                new FeatureOption('Collaborate', 'Friends', 'Play together'),
                new FeatureOption('Compete', 'Enemies', 'Play head to head.'),
            ];
            expect(JSON.stringify(currentFeatures)).toEqual(JSON.stringify(expectedGroups));
        });

        it('it requests features on first request', fakeAsync(() => {
            expect(lastConnection).toBeNull();
            messageBus.connectionStatus.next(true);
            expect(lastConnection.request.url).toEqual('/api/features');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(results)
            })));
            tick();
        }));

        it('it does not re-request after first call', fakeAsync(() => {
            expect(lastConnection).toBeNull();
            messageBus.connectionStatus.next(true);
            expect(lastConnection.request.url).toEqual('/api/features');
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
            expect(lastConnection.request.url).toEqual('/api/features');
            lastConnection.mockError(new ResponseOptions({
                type: ResponseType.Error,
                status: 404
            }));
            tick();

            expect(currentFeatures).toEqual([]);
            lastConnection = null;
            messageBus.connectionStatus.next(false);
            messageBus.connectionStatus.next(true);
            expect(lastConnection.request.url).toEqual('/api/features');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(results)
            })));
            tick();
        }));
    });
});
