import {Component} from '@angular/core';

@Component({
    selector: 'sign-in',
    template: require('./sign-in.component.html'),
})
export class SignInComponent {
    public message: string = '';
    public showManual: boolean = false;
    public showFacebook: boolean = false;

    constructor() {
        //  TODO - not right
        this.showFacebook = true;
        this.showManual = true;
    }

    fbLogin(): void {
        //  TODO - not right
        console.log('fb login');
    }
}
