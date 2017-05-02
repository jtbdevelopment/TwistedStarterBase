import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {NgbModule, NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {AdminSwitchPlayerComponent} from './admin-switch-player.component';
import {FormsModule} from '@angular/forms';
import {PlayerService} from '../../core-ui/player/player.service';
import {Player} from '../../core-ui/player/player.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

class MockPlayerService {
    static playerSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());
    static loggedInSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());

    player: Observable<Player> = Observable.from<Player>(MockPlayerService.playerSubject);
    loggedInPlayer: Observable<Player> = Observable.from<Player>(MockPlayerService.loggedInSubject);

    simulateUser = jasmine.createSpy('su');
}

describe('admin switch player component', () => {
    let backend: MockBackend;
    let lastConnection: any;

    let initialPlayer = new Player({id: 'loggedin'});
    let simUser = new Player({id: 'sim'});

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                FormsModule
            ],
            declarations: [
                AdminSwitchPlayerComponent
            ],
            providers: [
                {provide: ConnectionBackend, useClass: MockBackend},
                {provide: RequestOptions, useClass: BaseRequestOptions},
                {provide: PlayerService, useClass: MockPlayerService},
                Http,
                NgbPaginationConfig
            ],
        });
        TestBed.compileComponents();
        MockPlayerService.playerSubject.next(initialPlayer);
        MockPlayerService.loggedInSubject.next(initialPlayer);
        tick();
    }));

    beforeEach(inject([ConnectionBackend], (connectBackEnd) => {
        backend = connectBackEnd;
        backend.connections.subscribe((connection: any) => {
            lastConnection = connection;
        });
    }));

    it('should render results from http', fakeAsync(() => {
        const fixture = TestBed.createComponent(AdminSwitchPlayerComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.revertEnabled).toBeFalsy();
        expect(fixture.componentInstance.revertText).toEqual('You are yourself.');
        expect(fixture.componentInstance.searchText).toEqual('');
    }));

    describe('it after initial page of users loaded', () => {
        let players = [
            new Player({id: 'id1', displayName: 'dn1'}),
            new Player({id: 'id2', displayName: 'dn2'}),
            new Player({id: 'id3', displayName: 'dn4'}),
            new Player({id: 'id4', displayName: 'dn4'}),
        ];
        let fixture: any;
        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(AdminSwitchPlayerComponent);
            expect(lastConnection.request.url).toEqual('/api/player/admin/playersLike/?pageSize=20&page=0&like=');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: {
                    totalElements: 20,
                    number: 0,
                    content: players
                }
            })));
            tick();
        }));

        it('does render of players', fakeAsync(() => {
            fixture.detectChanges();
            expect(fixture.componentInstance.currentPage).toBeCloseTo(1);
            expect(fixture.componentInstance.totalPlayers).toBeCloseTo(20);
            expect(JSON.stringify(fixture.componentInstance.players)).toEqual(JSON.stringify(players));

            players.forEach(p => {
                expect(fixture.nativeElement.querySelector("#" + p.id)).not.toBeNull();
            });
        }));

        it('can change pages', fakeAsync(() => {
            let newPlayers = [
                new Player({id: 'id7', displayName: 'dn7'}),
                new Player({id: 'id8', displayName: 'dn8'}),
                new Player({id: 'id9', displayName: 'dn9'}),
                new Player({id: 'id0', displayName: 'dn0'}),
            ];

            fixture.componentInstance.currentPage = 2;
            fixture.componentInstance.changePage();
            fixture.detectChanges();

            expect(lastConnection.request.url).toEqual('/api/player/admin/playersLike/?pageSize=20&page=1&like=');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: {
                    totalElements: 20,
                    number: 1,
                    content: newPlayers
                }
            })));
            fixture.detectChanges();
            expect(fixture.componentInstance.currentPage).toEqual(2);
            expect(fixture.componentInstance.totalPlayers).toBeCloseTo(20);
            expect(JSON.stringify(fixture.componentInstance.players)).toEqual(JSON.stringify(newPlayers));

            players.forEach(p => {
                expect(fixture.nativeElement.querySelector("#" + p.id)).toBeNull();
            });
            newPlayers.forEach(p => {
                expect(fixture.nativeElement.querySelector("#" + p.id)).not.toBeNull();
            });
            tick();
        }));

        it('can change search text', fakeAsync(() => {
            let newPlayers = [
                new Player({id: 'id7', displayName: 'dn7'})
            ];

            fixture.componentInstance.searchText = 'dn7';
            fixture.detectChanges();
            fixture.componentInstance.refreshUsers();

            expect(lastConnection.request.url).toEqual('/api/player/admin/playersLike/?pageSize=20&page=0&like=dn7');
            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: {
                    totalElements: 1,
                    number: 0,
                    content: newPlayers
                }
            })));
            fixture.detectChanges();
            expect(fixture.componentInstance.currentPage).toEqual(1);
            expect(fixture.componentInstance.totalPlayers).toBeCloseTo(1);
            expect(JSON.stringify(fixture.componentInstance.players)).toEqual(JSON.stringify(newPlayers));

            players.forEach(p => {
                expect(fixture.nativeElement.querySelector("#" + p.id)).toBeNull();
            });
            newPlayers.forEach(p => {
                expect(fixture.nativeElement.querySelector("#" + p.id)).not.toBeNull();
            });
            tick();
        }));

        it('switching players', fakeAsync(inject([PlayerService], (playerService) => {
            fixture.componentInstance.switchToPlayer(simUser.id);
            expect(playerService.simulateUser).toHaveBeenCalledWith(simUser.id);
            MockPlayerService.playerSubject.next(simUser);
            tick();
            fixture.detectChanges();

            expect(fixture.componentInstance.revertEnabled).toBeTruthy();
            expect(fixture.componentInstance.revertText).toEqual('You are simulating another player.');
        })));

        it('reverting', fakeAsync(inject([PlayerService], (playerService) => {
            fixture.componentInstance.revertEnabled = true;
            fixture.componentInstance.revertText = '';
            fixture.componentInstance.revertToNormal();
            expect(playerService.simulateUser).toHaveBeenCalledWith(initialPlayer.id);
            MockPlayerService.playerSubject.next(initialPlayer);
            tick();
            fixture.detectChanges();

            expect(fixture.componentInstance.revertEnabled).toBeFalsy();
            expect(fixture.componentInstance.revertText).toEqual('You are yourself.');
        })));
    });

});
