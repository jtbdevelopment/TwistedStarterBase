import {MainComponent} from './main';
import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('Main Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                MainComponent
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
