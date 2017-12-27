import {Component, Inject} from '@angular/core';
import {FacebookLoginService} from '../../core-games-ui/facebook/facebook-login.service';
import {FacebookInitializerService} from '../../core-games-ui/facebook/facebook-initializer.service';

@Component({
    selector: 'sign-in',
    template: require('./sign-in.component.html'),
})
export class SignInComponent {
    public message: string = '';
    public showManual: boolean = false;
    public showFacebook: boolean = false;

    constructor(private facebookLogin: FacebookLoginService,
                private facebookInit: FacebookInitializerService,
                @Inject('Window') private window: Window) {
        this.showManual = true;
        this.showFacebook = false;
        this.facebookInit.fbReady.then(() => {
            this.showFacebook = true;
        });
        this.facebookLogin.canAutoLogin.subscribe((can: boolean) => {
            if (can) {
                this.autoLogin();
            }
        });
    }

    public fbLogin(): void {
        this.facebookLogin.initiateLogin();
    }

    private autoLogin(): void {
        console.log('redirecting');
        this.showFacebook = false;
        this.showManual = false;
        this.message = 'Logging in via Facebook';
        this.window.location.href = '/auth/facebook';
    }
}
