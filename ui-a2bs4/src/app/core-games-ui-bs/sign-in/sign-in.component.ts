import {Component, Inject} from '@angular/core';
import {FacebookLoginService} from '../../core-games-ui/facebook/facebook-login.service';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'sign-in',
    template: require('./sign-in.component.html'),
})
export class SignInComponent {
    public message: string = '';
    public showManual: boolean = false;
    public showFacebook: boolean = false;

    constructor(private facebook: FacebookLoginService, @Inject(DOCUMENT) private document: any) {
        this.showFacebook = true;
        this.showManual = true;
        this.facebook.canAutoLogin.subscribe((can: boolean) => {
            if (can) {
                this.autoLogin();
            }
        });
    }

    public fbLogin(): void {
        this.facebook.initiateLogin();
    }

    private autoLogin(): void {
        console.log('redirecting');
        this.showFacebook = false;
        this.showManual = false;
        this.message = 'Logging in via Facebook';
        this.document.location.href = '/auth/facebook';
    }
}
