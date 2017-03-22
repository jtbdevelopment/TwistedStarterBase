import {TestBed, async} from '@angular/core/testing';
import {AppConfig} from '../appconfig';
import {NavigationBarComponent} from './navigation-bar';

describe('footer component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationBarComponent
            ],
            providers: [
                AppConfig
            ],
        });
        TestBed.compileComponents();
    }));

    it('should render \'FountainJS team\'', () => {
        const fixture = TestBed.createComponent(NavigationBarComponent);
        fixture.detectChanges();
        const footer = fixture.nativeElement;
        expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
    });
});
