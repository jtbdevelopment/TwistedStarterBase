import {Component} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {MainComponent} from './main';

@Component({selector: 'fountain-footer', template: ''})
class MockFooterComponent {}

describe('Main Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MockFooterComponent,
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render the header, title, techs and footer', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const main = fixture.nativeElement;
    expect(main.querySelector('fountain-footer')).not.toBeNull();
  });
});
