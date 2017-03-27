import {Component} from '@angular/core';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {Http, Response} from '@angular/http';
@Component({
    selector: 'sign-in',
    template: require('./sign-in.component.html'),
})
export class SignInComponent {
    public message: string;
    public csrf: string = '';
    public showManual: boolean = false;
    public showFacebook: boolean = false;
    constructor(private _cookieService: CookieService, private http: Http) {
        this.message = 'Getting API';
        //  TODO - fix me and not working anyway
        this.http.get('/api/social/apis').toPromise().then(response => {
            this.message = 'Got API';
            console.log(response);
            console.log(JSON.stringify(response.json().data));
            this.csrf = this._cookieService.get('XSRF-TOKEN');
            console.log(this.csrf);
        }).catch(error => {
            console.error(error);
        });
    }
}
