import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavigationBarGameMenuToggleComponent} from './navigation-bar-game-menu-toggle.component';
import {GameMenuService} from '../game-menu/game-menu.service';
import {HelpDisplayService} from '../help/help-display.service';
import {NgbModule, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppConfig} from '../core-games-ui/appconfig.interface';


export class MockGameMenuService {
    static showGamesSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

    //noinspection JSUnusedGlobalSymbols
    public showGames: Observable<boolean> = Observable.from(MockGameMenuService.showGamesSubject);

    //noinspection JSUnusedGlobalSymbols,JSMethodCanBeStatic
    setShowGames(show: boolean): void {
        MockGameMenuService.showGamesSubject.next(show);
    }

    //noinspection JSUnusedGlobalSymbols,JSMethodCanBeStatic
    getShowGames(): boolean {
        return MockGameMenuService.showGamesSubject.getValue();
    }
}

export class MockAppConfig implements AppConfig {
    appName: string = 'Twisted Starter Base';
    hoverMenu: boolean = true;
    version: string = '';
    releaseNotes: string = '';
}

describe('Component:  nav bar game menu toggle component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule
            ],
            declarations: [
                NavigationBarGameMenuToggleComponent,
            ],
            providers: [
                {provide: GameMenuService, useClass: MockGameMenuService},
                {provide: 'AppConfig', useClass: MockAppConfig},
                HelpDisplayService,
                NgbPopoverConfig
            ],
        });
        TestBed.compileComponents();
    }));

    it('displays no toggle when player loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
        fixture.componentInstance.playerLoaded = false;
        fixture.detectChanges();
        const toggle = fixture.nativeElement;
        expect(toggle.querySelector('ul')).toBeNull();
    });

    //  TODO - this test seems lame
    it('displays toggle when player loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        const toggle = fixture.nativeElement;
        expect(toggle.querySelector('ul').textContent.trim()).toBe('');
    });

    it('can toggle menu on/off from non-hover', () => {
        const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
        fixture.detectChanges();
        expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
        fixture.componentInstance.toggleGameMenu();
        expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
        fixture.componentInstance.toggleGameMenu();
        expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
        fixture.componentInstance.toggleGameMenu();
        expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
    });

    it('toggling help on/off shows/hides popover', fakeAsync(inject([HelpDisplayService], (helpService) => {
        const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        helpService.toggleHelp();
        tick();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.popover').length).toBeCloseTo(1);
        helpService.toggleHelp();
        tick();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.popover').length).toBeCloseTo(0);
    })));

    describe('when enableHover is true', () => {
        beforeEach(inject(['AppConfig'], (config) => {
            config.hoverMenu = true;
        }));
        it('hovering on forces show games to true', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(false);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
        });

        it('stopping hovering on restores show games to true if started true', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(true);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.stopHoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
        });

        it('stopping hovering on restores show games to false if started false', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(false);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.stopHoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
        });

        it('toggling while hovering finalizes state - assume starting with hide menu', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(false);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.toggleGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.stopHoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
        });

        it('toggling while hovering finalizes state - assume starting with showing menu', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(true);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.toggleGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.stopHoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
        });
    });

    describe('when enableHover is false', () => {
        beforeEach(inject(['AppConfig'], (config) => {
            config.hoverMenu = false;
        }));
        it('hovering on forces does not enable show games', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(false);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
        });

        it('stopping hovering on restores show games to true if started true', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(true);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.stopHoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
        });

        it('stopping hovering on restores show games to false if started false', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(false);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.stopHoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
        });

        it('toggling while hovering finalizes state - assume starting with hide menu', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(false);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.toggleGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.stopHoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
        });

        it('toggling while hovering finalizes state - assume starting with showing menu', () => {
            const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
            fixture.detectChanges();
            MockGameMenuService.showGamesSubject.next(true);
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.hoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeTruthy();
            fixture.componentInstance.toggleGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
            fixture.componentInstance.stopHoverGameMenu();
            expect(MockGameMenuService.showGamesSubject.getValue()).toBeFalsy();
        });
    });
});
