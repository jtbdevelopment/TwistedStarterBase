import {TestBed} from '@angular/core/testing';
import {SignInComponent} from './sign-in.component';
import {FacebookLoginService} from '../../core-games-ui/facebook/facebook-login.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

class MockFacebookLogin {
    public canAutoLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
describe('Component:  sign in component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: FacebookLoginService, useClass: MockFacebookLogin}
            ],
            declarations: [
                SignInComponent,
            ]
        });
        TestBed.compileComponents();
    });

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
