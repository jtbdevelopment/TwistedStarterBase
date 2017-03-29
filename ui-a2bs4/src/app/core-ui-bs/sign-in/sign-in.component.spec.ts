import {TestBed, async} from '@angular/core/testing';
import {SignInComponent} from './sign-in.component';

describe('Component:  sign in component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SignInComponent,
            ]
        });
        TestBed.compileComponents();
    }));

    it('displays', () => {
        const fixture = TestBed.createComponent(SignInComponent);
        fixture.detectChanges();
        const screen = fixture.nativeElement;
        expect(screen.querySelector('#sign-in-message')).toBeDefined();
        expect(screen.querySelector('#sign-in-facebook')).toBeDefined();
        expect(screen.querySelector('sign-in-manual')).toBeDefined();
        expect(screen.querySelector('#sign-in-message').textContent.trim()).toEqual('');
    });

    it('displays message', () => {
        let m = 'A Message!';
        const fixture = TestBed.createComponent(SignInComponent);
        fixture.componentInstance.message = m;
        fixture.detectChanges();
        const screen = fixture.nativeElement;
        expect(screen.querySelector('#sign-in-message').textContent.trim()).toEqual(m);
    });
});
