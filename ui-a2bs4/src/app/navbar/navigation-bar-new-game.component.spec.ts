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

  it('toggling help on/off shows/hides popover', inject([HelpDisplayService], (helpService) => {
    const fixture = TestBed.createComponent(NavigationBarNewGameComponent);
    fixture.componentInstance.playerLoaded = true;
    fixture.detectChanges();
    helpService.toggleHelp();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.popover').length).toBeCloseTo(1);
    helpService.toggleHelp();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.popover').length).toBeCloseTo(0);
  }));

});
