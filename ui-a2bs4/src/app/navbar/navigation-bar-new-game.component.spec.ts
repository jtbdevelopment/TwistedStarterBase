import {inject, TestBed} from '@angular/core/testing';
import {NavigationBarNewGameComponent} from './navigation-bar-new-game.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {HelpDisplayService} from '../help/help-display.service';


describe('Component:  nav bar new game component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgbModule
            ],
            declarations: [
                NavigationBarNewGameComponent,
            ],
            providers: [
                HelpDisplayService,
                NgbPopoverConfig
            ]
        });
        TestBed.compileComponents();
    });

    it('display disabled when player not loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarNewGameComponent);
        fixture.componentInstance.playerLoaded = false;
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });

    it('displays toggle when player loaded', () => {
        const fixture = TestBed.createComponent(NavigationBarNewGameComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });

    it('toggling help on/off shows/hides popover', inject([HelpDisplayService], (helpService) => {
        const fixture = TestBed.createComponent(NavigationBarNewGameComponent);
        fixture.componentInstance.playerLoaded = true;
        fixture.detectChanges();
        helpService.toggleHelp();
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
        helpService.toggleHelp();
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    }));

});
