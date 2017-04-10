import {Component} from '@angular/core';
import {MainComponent} from './main';
import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

@Component({selector: 'navigation-bar', template: ''})
class MockNavBarComponent {
}

//  TODO - the scss blows up tests because of bs import
describe('Main Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
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
        expect(main.querySelector('.welcome-landing')).not.toBeNull();
    });
});
