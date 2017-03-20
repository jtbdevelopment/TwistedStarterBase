import {Component} from '@angular/core';
import {AppConfig} from '../appconfig';

@Component({
    selector: 'navbar',
    template: require('./navbar.html'),
    styles: [require('./navbar.scss').toString()]
})
export class NavBarComponent {
    public player: Object = {};
    public showAdmin: boolean = false;
    public showLogout: boolean = false;
    appName: string;

    constructor(config: AppConfig) {
        this.appName = config.appName;
    }
}
