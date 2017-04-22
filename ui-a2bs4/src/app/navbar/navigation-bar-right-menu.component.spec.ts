import {TestBed, async, inject} from '@angular/core/testing';
import {NavigationBarRightMenuComponent} from './navigation-bar-right-menu.component';
import {RouterTestingModule} from '@angular/router/testing';
import {PlayerService} from '../core-ui/player/player.service';

class MockPlayerService {
    logout = jasmine.createSpy('logout');
}

describe('Component:  nav bar right menu component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                {provide: PlayerService, useClass: MockPlayerService}
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
        const toggle = fixture.nativeElement;
        expect(toggle.querySelector('ul').textContent.trim()).toBe('');
    });

    it('test logout propogates to player service', inject([PlayerService], (playerService) => {
        const fixture = TestBed.createComponent(NavigationBarRightMenuComponent);
        fixture.componentInstance.logout();
        expect(playerService.logout).toHaveBeenCalledTimes(1);
    }));
});
