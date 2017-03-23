import {TestBed, async} from '@angular/core/testing';
import {AppConfig} from '../appconfig';
import {NavigationBarComponent} from './navigation-bar.component';
import {GameMenuService} from '../game-menu/game-menu.service';
import {NavigationBarModule} from './navigation-bar.module';

describe('footer component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NavigationBarModule
            ],
            providers: [
                AppConfig,
                GameMenuService
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
