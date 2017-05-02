import {async, fakeAsync, inject, TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminStatsComponent} from './admin-stats.component';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('admin stats component', () => {
    let backend: MockBackend;
    let connections: any[];

    beforeEach(async(() => {
        connections = [];
        TestBed.configureTestingModule({
            imports: [
                NgbModule
            ],
            declarations: [
                AdminStatsComponent
            ],
            providers: [
                {provide: ConnectionBackend, useClass: MockBackend},
                {provide: RequestOptions, useClass: BaseRequestOptions},
                Http
            ],
        });
        TestBed.compileComponents();
    }));

    beforeEach(inject([ConnectionBackend], (connectBackEnd) => {
        backend = connectBackEnd;
        backend.connections.subscribe((connection: any) => {
            connections.push(connection);
        });
    }));

    it('should render results from http', fakeAsync(() => {
        let now: number = Math.floor((new Date()).getTime() / 1000);
        let approxTimes: number[] = [
            Math.floor((now - 86400) / 100),
            Math.floor((now - (86400 * 7)) / 100),
            Math.floor((now - (86400 * 30)) / 100)
        ];
        const fixture = TestBed.createComponent(AdminStatsComponent);
        fixture.detectChanges();
        connections.find((connection) => {
            return connection.request.url === '/api/player/admin/playerCount';
        }).mockRespond(new Response(new ResponseOptions({
            body: 1.2
        })));

        connections.find((connection) => {
            return connection.request.url === '/api/player/admin/gameCount';
        }).mockRespond(new Response(new ResponseOptions({
            body: 3.4
        })));

        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/playersCreated/' + approxTimes[0]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 2.3
        })));
        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/playersCreated/' + approxTimes[1]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 4.5
        })));
        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/playersCreated/' + approxTimes[2]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 5.6
        })));

        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/gamesSince/' + approxTimes[0]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 10.2
        })));
        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/gamesSince/' + approxTimes[1]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 10.3
        })));
        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/gamesSince/' + approxTimes[2]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 10.4
        })));

        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/playersLoggedIn/' + approxTimes[0]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 6.7
        })));
        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/playersLoggedIn/' + approxTimes[1]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 7.8
        })));
        connections.find((connection) => {
            return connection.request.url.startsWith('/api/player/admin/playersLoggedIn/' + approxTimes[2]);
        }).mockRespond(new Response(new ResponseOptions({
            body: 8.9
        })));
        fixture.detectChanges();

        let content = fixture.nativeElement.querySelector('.admin-stats').textContent.trim();
        expect(content).toContain('1.2');
        expect(content).toContain('3.4');

        expect(content).toContain('2.3');
        expect(content).toContain('4.5');
        expect(content).toContain('5.6');

        expect(content).toContain('6.7');
        expect(content).toContain('7.8');
        expect(content).toContain('8.9');

        expect(content).toContain('10.2');
        expect(content).toContain('10.3');
        expect(content).toContain('10.4');
    }));
});
