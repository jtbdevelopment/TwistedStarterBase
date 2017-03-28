import {TestBed, async} from '@angular/core/testing';
import {NavigationBarNewGameComponent} from './navigation-bar-new-game.component';
import {RouterTestingModule} from '@angular/router/testing';


describe('Component:  nav bar new game component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                NavigationBarNewGameComponent,
            ],
        });
        TestBed.compileComponents();
    }));

    it('display disabled when player not loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarNewGameComponent);
        fixture.componentInstance.playerLoaded = false;
        fixture.detectChanges();
        const toggle = fixture.nativeElement;
        expect(toggle.querySelector('ul')).toBeNull();
    });

    //  TODO - this test seems lame
    it('displays toggle when player loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarNewGameComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        const toggle = fixture.nativeElement;
        expect(toggle.querySelector('ul').textContent.trim()).toBe('');
    });
});
