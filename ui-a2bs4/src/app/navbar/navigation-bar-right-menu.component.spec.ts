import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {NavigationBarRightMenuComponent} from './navigation-bar-right-menu.component';
import {RouterTestingModule} from '@angular/router/testing';
import {PlayerService} from '../core-games-ui/player/player.service';
import {NgbModule, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {HelpDisplayService} from '../help/help-display.service';

class MockPlayerService {
    logout = jasmine.createSpy('logout');
}

describe('Component:  nav bar right menu component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgbModule
            ],
            providers: [
                {provide: PlayerService, useClass: MockPlayerService},
                HelpDisplayService,
                NgbPopoverConfig
            ],
            declarations: [
                NavigationBarRightMenuComponent
            ],
        });
        TestBed.compileComponents();
    }));

    it('display disabled when player not loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.playerLoaded = false;
        fixture.detectChanges();
        const toggle = fixture.nativeElement;
        expect(toggle.querySelector('ul')).toBeNull();
    });

    //  TODO - this test seems lame
    it('displays toggle when player loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('ul').textContent.trim()).toBe('');
    });

    it('toggling help on/off shows/hides popover', fakeAsync(inject([HelpDisplayService], (helpService) => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        fixture.componentInstance.toggleHelp();
        expect(helpService.isShown()).toBeTruthy();
        tick();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.popover').length).toBeCloseTo(1);
        fixture.componentInstance.toggleHelp();
        expect(helpService.isShown()).toBeFalsy();
        tick();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.popover').length).toBeCloseTo(0);
    })));

    it('test logout propogates to player service', inject([PlayerService], (playerService) => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.logout();
        expect(playerService.logout).toHaveBeenCalledTimes(1);
    }));
});
