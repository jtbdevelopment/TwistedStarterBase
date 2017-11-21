import {
    BaseRequestOptions,
    ConnectionBackend,
    Http,
    RequestMethod,
    RequestOptions,
    Response,
    ResponseOptions
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReflectiveInjector} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {AppConfig} from '../../core-games-ui/appconfig.interface';
import {Subject} from 'rxjs/Subject';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VersionService} from './version.service';
import {Player} from '../../core-games-ui/player/player.model';
import {PlayerService} from '../../core-games-ui/player/player.service';
import {DefaultVersionNotesComponent} from './default-version-notes.component';

class MockConfig implements AppConfig {
    releaseNotes: string = '';
    hoverMenu: boolean = false;
    appName: string = '';
    version: string = '1.3.1';
}

class MockPlayerService {
    public loggedInPlayer: Subject<Player> = new Subject<Player>();
}

class MockModalService {
    open = jasmine.createSpy('open');
}

describe('Service: version service', () => {
    let currentPlayer: Player = null;
    let loggedInPlayer: Player = null;
    let playerService: MockPlayerService;
    let backend: MockBackend;
    let lastConnection: any;
    let modalService: MockModalService;
    let versionService: VersionService;

    beforeEach(() => {
        currentPlayer = null;
        loggedInPlayer = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            {provide: 'AppConfig', useClass: MockConfig},
            {provide: PlayerService, useClass: MockPlayerService},
            {provide: NgbModal, useClass: MockModalService},
            Http,
            VersionService
        ]);
        playerService = this.injector.get(PlayerService);
        modalService = this.injector.get(NgbModal);
        versionService = this.injector.get(VersionService);
        backend = this.injector.get(ConnectionBackend) as MockBackend;
        backend.connections.subscribe((connection: any) => lastConnection = connection);
    });

    it('does not display when version matches', fakeAsync(() => {
        let p = new Player();
        p.lastVersionNotes = '1.3.1';
        expect(modalService.open).not.toHaveBeenCalled();
        playerService.loggedInPlayer.next(p);
        tick();
        expect(modalService.open).not.toHaveBeenCalled();
        expect(lastConnection).toBeUndefined();
    }));

    describe('expect to be updated', () => {
        afterEach(fakeAsync(() => {
            tick();
            expect(modalService.open).toHaveBeenCalledWith(DefaultVersionNotesComponent);
            expect(lastConnection.request.url).toEqual('/api/player/lastVersionNotes/1.3.1');
            expect(lastConnection.request.method).toEqual(RequestMethod.Post);
            expect(lastConnection.request._body).toEqual('');
            lastConnection.mockRespond(new Response(new ResponseOptions()));
        }));

        it('does display when version is minor patch', fakeAsync(() => {
            let p = new Player();
            p.lastVersionNotes = '1.3.0';
            expect(modalService.open).not.toHaveBeenCalled();
            playerService.loggedInPlayer.next(p);
        }));

        it('does display when version is minor patch from unpatched', fakeAsync(() => {
            let p = new Player();
            p.lastVersionNotes = '1.3';
            expect(modalService.open).not.toHaveBeenCalled();
            playerService.loggedInPlayer.next(p);
        }));

        it('does display when version is minor upgrade', fakeAsync(() => {
            let p = new Player();
            p.lastVersionNotes = '1.2.1';
            expect(modalService.open).not.toHaveBeenCalled();
            playerService.loggedInPlayer.next(p);
        }));

        it('does display when version is major upgrade', fakeAsync(() => {
            let p = new Player();
            p.lastVersionNotes = '0.3.1';
            expect(modalService.open).not.toHaveBeenCalled();
            playerService.loggedInPlayer.next(p);
        }));
    });
});
