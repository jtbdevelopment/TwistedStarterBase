import {MockBackend} from '@angular/http/testing';
import {FriendsService} from './friends.service';
import {ReflectiveInjector} from '@angular/core';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {Friend} from './friend.model';
import {Invitable} from './invitable.model';
import {MessageBusService} from '../messagebus/message-bus.service';
import {Player} from '../player/player.model';


describe('Service: friends service', () => {
    let backend: MockBackend;
    let lastConnection: any;
    let friendService: FriendsService;
    let friends: Friend[];
    let invitables: Invitable[];
    let messageBus: MessageBusService;

    beforeEach(async(() => {
        lastConnection = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
                {provide: ConnectionBackend, useClass: MockBackend},
                {provide: RequestOptions, useClass: BaseRequestOptions},
                Http,
                MessageBusService,
                FriendsService
            ]
        );
        friendService = this.injector.get(FriendsService);
        messageBus = this.injector.get(MessageBusService);
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
        friendService.friends.subscribe(x => friends = x);
        friendService.invitableFriends.subscribe(x => invitables = x);
    }));

    it('initial state is no friends', () => {
        expect(friends).toEqual([]);
        expect(invitables).toEqual([]);
        expect(lastConnection).toBeNull();
    });

    it('refresh friends, only invitables', fakeAsync(() => {
        friendService.refreshFriends();
        expect(lastConnection.request.url).toEqual('/api/player/friendsV2');
        let friendsResponse = {
            invitableFriends: [
                {
                    id: 'id1',
                    name: 'name1'
                },
                {
                    id: 'id3',
                    name: 'name3'
                },
                {
                    id: 'id2',
                    name: 'name2'
                },
            ]
        };
        lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(friendsResponse)
        })));
        tick();

        expect(friends).toEqual([]);
        expect(invitables.length).toEqual(3);
        expect(JSON.stringify(invitables)).toEqual('[{"id":"id1","displayName":"name1"},{"id":"id3","displayName":"name3"},{"id":"id2","displayName":"name2"}]');
    }));

    it('refresh friends, only friends', fakeAsync(() => {
        friendService.refreshFriends();
        expect(lastConnection.request.url).toEqual('/api/player/friendsV2');
        let friendsResponse = {
            maskedFriends: [
                {
                    md5: 'x1',
                    displayName: 'dname1'
                },
                {
                    md5: '1fx',
                    displayName: 'dname3'
                }
            ]
        };
        lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(friendsResponse)
        })));
        tick();

        expect(invitables).toEqual([]);
        expect(friends.length).toEqual(2);
        expect(JSON.stringify(friends)).toEqual('[{"md5":"x1","displayName":"dname1"},{"md5":"1fx","displayName":"dname3"}]');
    }));

    it('refresh friends', fakeAsync(() => {
        friendService.refreshFriends();
        expect(lastConnection.request.url).toEqual('/api/player/friendsV2');
        let friendsResponse = {
            invitableFriends: [
                {
                    id: 'id1',
                    name: 'name1'
                },
                {
                    id: 'id3',
                    name: 'name3'
                },
                {
                    id: 'id2',
                    name: 'name2'
                },
            ],
            maskedFriends: [
                {
                    md5: 'x1',
                    displayName: 'dname1'
                },
                {
                    md5: '1fx',
                    displayName: 'dname3'
                }
            ]
        };
        lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(friendsResponse)
        })));
        tick();

        expect(friends.length).toEqual(2);
        expect(JSON.stringify(friends)).toEqual('[{"md5":"x1","displayName":"dname1"},{"md5":"1fx","displayName":"dname3"}]');
        expect(invitables.length).toEqual(3);
        expect(JSON.stringify(invitables)).toEqual('[{"id":"id1","displayName":"name1"},{"id":"id3","displayName":"name3"},{"id":"id2","displayName":"name2"}]');
    }));

    it('update to player does not clear friends', fakeAsync(() => {

        messageBus.playerUpdates.next(new Player({id: 'thisId'}));
        tick();
        friendService.refreshFriends();
        expect(lastConnection.request.url).toEqual('/api/player/friendsV2');
        let friendsResponse = {
            invitableFriends: [
                {
                    id: 'id1',
                    name: 'name1'
                }
            ],
            maskedFriends: [
                {
                    md5: 'x1',
                    displayName: 'dname1'
                }
            ]
        };
        lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(friendsResponse)
        })));
        tick();

        expect(friends.length).toEqual(1);
        expect(invitables.length).toEqual(1);

        messageBus.playerUpdates.next(new Player({id: 'thisId', imageUrl: 'y'}));
        tick();

        expect(friends.length).toEqual(1);
        expect(invitables.length).toEqual(1);

    }));

    it('update to new player does clear friends', fakeAsync(() => {
        messageBus.playerUpdates.next(new Player({id: 'thisId', imageUrl: 'x'}));
        tick();
        friendService.refreshFriends();
        expect(lastConnection.request.url).toEqual('/api/player/friendsV2');
        let friendsResponse = {
            invitableFriends: [
                {
                    id: 'id1',
                    name: 'name1'
                }
            ],
            maskedFriends: [
                {
                    md5: 'x1',
                    displayName: 'dname1'
                }
            ]
        };
        lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(friendsResponse)
        })));
        tick();

        expect(friends.length).toEqual(1);
        expect(invitables.length).toEqual(1);

        messageBus.playerUpdates.next(new Player({id: 'newId', imageUrl: 'y'}));
        tick();

        expect(friends.length).toEqual(0);
        expect(invitables.length).toEqual(0);

    }));
});
