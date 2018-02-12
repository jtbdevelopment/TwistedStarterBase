import {inject, TestBed} from '@angular/core/testing';
import {NavigationBarRightMenuComponent} from './navigation-bar-right-menu.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {HelpDisplayService} from '../help/help-display.service';
import {PlayerService} from 'jtb-core-games-ui';

class MockPlayerService {
    logout = jasmine.createSpy('logout');
}

describe('Component:  nav bar right menu component', () => {

    beforeEach(() => {
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
    });

    it('display disabled when player not loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.playerLoaded = false;
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });

    it('displays toggle when player loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });

    it('toggling help on/off shows/hides popover', inject([HelpDisplayService], (helpService) => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        fixture.componentInstance.toggleHelp();
        expect(helpService.isShown()).toBeTruthy();
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
        fixture.componentInstance.toggleHelp();
        expect(helpService.isShown()).toBeFalsy();
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    }));

    it('test logout propogates to player service', inject([PlayerService], (playerService) => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.logout();
        expect(playerService.logout).toHaveBeenCalledTimes(1);
    }));
});
