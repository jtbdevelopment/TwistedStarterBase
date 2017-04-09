import {Component} from '@angular/core';

@Component({selector: 'navigation-bar', template: ''})
class MockNavBarComponent {}

//  TODO - the scss blows up tests because of bs import
/*
describe('Main Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MockNavBarComponent,
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render the header, title, techs and footer', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const main = fixture.nativeElement;
    expect(main.querySelector('main')).not.toBeNull();
  });
});
 */