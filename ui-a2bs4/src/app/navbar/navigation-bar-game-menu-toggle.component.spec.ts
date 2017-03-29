import {TestBed, async} from '@angular/core/testing';
import {Observable, BehaviorSubject} from 'rxjs';
import {NavigationBarGameMenuToggleComponent} from './navigation-bar-game-menu-toggle.component';
import {GameMenuService} from '../game-menu/game-menu.service';


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

describe('Component:  nav bar game menu toggle component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationBarGameMenuToggleComponent,
            ],
            providers: [
                {provide: GameMenuService, useClass: MockGameMenuService}
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
});
