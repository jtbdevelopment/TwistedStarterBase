import {MainComponent} from './main';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('Main Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                MainComponent
            ]
        });
        TestBed.compileComponents();
    });

    it('should render the header, title, techs and footer', () => {
        const fixture = TestBed.createComponent(MainComponent);
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });
});
