import {TestBed, async} from '@angular/core/testing';
import {NavigationBarRightMenuComponent} from './navigation-bar-right-menu.component';


describe('Component:  nav bar new game component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationBarRightMenuComponent,
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
});
