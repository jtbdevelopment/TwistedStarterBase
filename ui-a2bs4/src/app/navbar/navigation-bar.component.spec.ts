import {async, TestBed} from '@angular/core/testing';
import {NavigationBarComponent} from './navigation-bar.component';
import {Component, Input} from '@angular/core';
import {PlayerService} from '../core-games-ui/player/player.service';
import {Player} from '../core-games-ui/player/player.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppConfig} from '../core-games-ui/appconfig.interface';

@Component({
    selector: 'navigation-bar-game-menu-toggle',
    template: '<p>{{playerLoaded}}</p>'
})
export class MockGameMenuToggleComponent {
    @Input() playerLoaded: boolean;
}

@Component({
    selector: 'navigation-bar-new-game',
    template: '<p>{{playerLoaded}}</p>'
})
export class MockNewGameComponent {
    @Input() playerLoaded: boolean;
}

@Component({
    selector: 'navigation-bar-right-menu',
    template: '<p>{{playerLoaded}}/{{showAdmin}}/{{showLogout}}</p>'
})
export class MockRightBarMenuComponent {
    @Input() playerLoaded: boolean;
    @Input() showAdmin: boolean;
    @Input() showLogout: boolean;
}

export class MockAppConfig implements AppConfig {
    appName: string = 'Test';
    hoverMenu: boolean;
    version: string = '';
    releaseNotes: string = '';
}

export class MockPlayerService {
    static playerSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());
    static loggedInSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());

    player: Observable<Player> = Observable.from<Player>(MockPlayerService.playerSubject);
    loggedInPlayer: Observable<Player> = Observable.from<Player>(MockPlayerService.loggedInSubject);
}

describe('nav bar component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationBarComponent,
                MockGameMenuToggleComponent,
                MockRightBarMenuComponent,
                MockNewGameComponent
            ],
            providers: [
                {provide: 'AppConfig', useClass: MockAppConfig},
                {provide: PlayerService, useClass: MockPlayerService}
            ],
        });
        TestBed.compileComponents();
        MockPlayerService.loggedInSubject.next(new Player());
        MockPlayerService.playerSubject.next(new Player());
    }));

    it('should render basics when no player logged in', () => {
        const fixture = TestBed.createComponent(NavigationBarComponent);
        fixture.detectChanges();
        const navBar = fixture.nativeElement;
        expect(fixture.componentInstance.playerName).toBeUndefined();
        expect(fixture.componentInstance.playerLoaded).toBeFalsy();
        expect(fixture.componentInstance.showLogout).toBeFalsy();
        expect(fixture.componentInstance.showAdmin).toBeFalsy();
        expect(fixture.componentInstance.appName).toEqual('Test');
        expect(navBar.querySelector('navigation-bar-game-menu-toggle').textContent.trim()).toBe('false');
        expect(navBar.querySelector('navigation-bar-new-game').textContent.trim()).toBe('false');
        expect(navBar.querySelector('navigation-bar-right-menu').textContent.trim()).toBe('false/false/false');
        expect(navBar.querySelector('a').textContent.trim()).toBe('Test\n        Welcome');
    });

    it('should update for a regular non manual player', () => {
        const fixture = TestBed.createComponent(NavigationBarComponent);
        fixture.detectChanges();
        const navBar = fixture.nativeElement;
        expect(fixture.componentInstance.playerName).toBeUndefined();
        expect(fixture.componentInstance.playerLoaded).toBeFalsy();
        expect(fixture.componentInstance.showLogout).toBeFalsy();
        expect(fixture.componentInstance.showAdmin).toBeFalsy();
        expect(fixture.componentInstance.appName).toEqual('Test');
        expect(navBar.querySelector('navigation-bar-game-menu-toggle').textContent.trim()).toBe('false');
        expect(navBar.querySelector('navigation-bar-new-game').textContent.trim()).toBe('false');
        expect(navBar.querySelector('navigation-bar-right-menu').textContent.trim()).toBe('false/false/false');
        expect(navBar.querySelector('a').textContent.trim()).toBe('Test\n        Welcome');

        let p: Player = new Player();
        p.displayName = 'XYZ';
        p.source = 'Facebook';
        p.adminUser = false;

        MockPlayerService.loggedInSubject.next(p);
        MockPlayerService.playerSubject.next(p);
        fixture.detectChanges();

        expect(fixture.componentInstance.playerName).toEqual(p.displayName);
        expect(fixture.componentInstance.playerLoaded).toBeTruthy();
        expect(fixture.componentInstance.showLogout).toBeFalsy();
        expect(fixture.componentInstance.showAdmin).toBeFalsy();
        expect(fixture.componentInstance.appName).toEqual('Test');
        expect(navBar.querySelector('navigation-bar-game-menu-toggle').textContent.trim()).toBe('true');
        expect(navBar.querySelector('navigation-bar-new-game').textContent.trim()).toBe('true');
        expect(navBar.querySelector('navigation-bar-right-menu').textContent.trim()).toBe('true/false/false');
        expect(navBar.querySelector('a').textContent.trim()).toBe('Test\n        Welcome XYZ');
    });

    it('should update for a regular manual player', () => {
        const fixture = TestBed.createComponent(NavigationBarComponent);
        fixture.detectChanges();
        const navBar = fixture.nativeElement;
        expect(fixture.componentInstance.playerName).toBeUndefined();
        expect(fixture.componentInstance.playerLoaded).toBeFalsy();
        expect(fixture.componentInstance.showLogout).toBeFalsy();
        expect(fixture.componentInstance.showAdmin).toBeFalsy();
        expect(fixture.componentInstance.appName).toEqual('Test');
        expect(navBar.querySelector('navigation-bar-game-menu-toggle').textContent.trim()).toBe('false');
        expect(navBar.querySelector('navigation-bar-new-game').textContent.trim()).toBe('false');
        expect(navBar.querySelector('navigation-bar-right-menu').textContent.trim()).toBe('false/false/false');
        expect(navBar.querySelector('a').textContent.trim()).toBe('Test\n        Welcome');

        let p: Player = new Player();
        p.displayName = 'XYZ';
        p.source = 'MANUAL';
        p.adminUser = false;

        MockPlayerService.loggedInSubject.next(p);
        MockPlayerService.playerSubject.next(p);
        fixture.detectChanges();

        expect(fixture.componentInstance.playerName).toEqual(p.displayName);
        expect(fixture.componentInstance.playerLoaded).toBeTruthy();
        expect(fixture.componentInstance.showLogout).toBeTruthy();
        expect(fixture.componentInstance.showAdmin).toBeFalsy();
        expect(fixture.componentInstance.appName).toEqual('Test');
        expect(navBar.querySelector('navigation-bar-game-menu-toggle').textContent.trim()).toBe('true');
        expect(navBar.querySelector('navigation-bar-new-game').textContent.trim()).toBe('true');
        expect(navBar.querySelector('navigation-bar-right-menu').textContent.trim()).toBe('true/false/true');
        expect(navBar.querySelector('a').textContent.trim()).toBe('Test\n        Welcome XYZ');
    });

    it('should update for a admin non manual player', () => {
        const fixture = TestBed.createComponent(NavigationBarComponent);
        fixture.detectChanges();
        const navBar = fixture.nativeElement;
        expect(fixture.componentInstance.playerName).toBeUndefined();
        expect(fixture.componentInstance.playerLoaded).toBeFalsy();
        expect(fixture.componentInstance.showLogout).toBeFalsy();
        expect(fixture.componentInstance.showAdmin).toBeFalsy();
        expect(fixture.componentInstance.appName).toEqual('Test');
        expect(navBar.querySelector('navigation-bar-game-menu-toggle').textContent.trim()).toBe('false');
        expect(navBar.querySelector('navigation-bar-new-game').textContent.trim()).toBe('false');
        expect(navBar.querySelector('navigation-bar-right-menu').textContent.trim()).toBe('false/false/false');
        expect(navBar.querySelector('a').textContent.trim()).toBe('Test\n        Welcome');

        let p: Player = new Player();
        p.displayName = 'XYZ';
        p.source = 'Facebook';
        p.adminUser = true;

        MockPlayerService.loggedInSubject.next(p);
        MockPlayerService.playerSubject.next(p);
        fixture.detectChanges();

        expect(fixture.componentInstance.playerName).toEqual(p.displayName);
        expect(fixture.componentInstance.playerLoaded).toBeTruthy();
        expect(fixture.componentInstance.showLogout).toBeFalsy();
        expect(fixture.componentInstance.showAdmin).toBeTruthy();
        expect(fixture.componentInstance.appName).toEqual('Test');
        expect(navBar.querySelector('navigation-bar-game-menu-toggle').textContent.trim()).toBe('true');
        expect(navBar.querySelector('navigation-bar-new-game').textContent.trim()).toBe('true');
        expect(navBar.querySelector('navigation-bar-right-menu').textContent.trim()).toBe('true/true/false');
        expect(navBar.querySelector('a').textContent.trim()).toBe('Test\n        Welcome XYZ');
    });
});
