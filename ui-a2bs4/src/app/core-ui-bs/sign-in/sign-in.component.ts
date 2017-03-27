import {Component} from '@angular/core';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {Http} from '@angular/http';
@Component({
    selector: 'sign-in',
    template: require('./sign-in.component.html'),
})
export class SignInComponent {
    public message: string = '';
    public showManual: boolean = false;
    public showFacebook: boolean = false;

    constructor(private _cookieService: CookieService, private http: Http) {
        //  TODO - not right
        this.showFacebook = true;
        this.showManual = true;
    }

    fbLogin(): void {
        //  TODO - not right
        console.log('fb login');
    }
}
