import {inject, TestBed} from '@angular/core/testing';
import {NavigationBarGameMenuToggleComponent} from './navigation-bar-game-menu-toggle.component';
import {GameMenuService} from '../game-menu/game-menu.service';
import {HelpDisplayService} from '../help/help-display.service';
import {NgbModule, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppConfig} from 'jtb-core-games-ui';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {from} from 'rxjs/observable/from';


export class MockGameMenuService {
    static showGamesSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

    //noinspection JSUnusedGlobalSymbols
    public showGames: Observable<boolean> = from(MockGameMenuService.showGamesSubject);

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
    appName = 'Twisted Starter Base';
    hoverMenu = true;
    version = '';
    releaseNotes = '';
    // noinspection JSUnusedGlobalSymbols
    inviteFriendsMessage = '';
}

describe('Component:  nav bar game menu toggle component', () => {
    beforeEach(() => {
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
    });

    it('displays no toggle when player loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
        fixture.componentInstance.playerLoaded = false;
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });

    it('displays toggle when player loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
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

    it('toggling help on/off shows/hides popover', inject([HelpDisplayService], (helpService) => {
        const fixture = TestBed.createComponent(NavigationBarGameMenuToggleComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        helpService.toggleHelp();
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
        helpService.toggleHelp();
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    }));

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
