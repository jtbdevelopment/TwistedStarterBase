import {NavBarComponent} from "./navbar";
import {TestBed, async} from "@angular/core/testing";

describe('footer component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavBarComponent
            ]
        });
        TestBed.compileComponents();
    }));

    it('should render \'FountainJS team\'', () => {
        const fixture = TestBed.createComponent(NavBarComponent);
        fixture.detectChanges();
        const footer = fixture.nativeElement;
        expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
    });
});
