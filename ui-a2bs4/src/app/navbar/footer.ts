import {Component} from '@angular/core';
import {AppConfig} from '../AppConfig';

@Component({
    selector: 'fountain-footer',
    template: require('./footer.html'),
    styles: [require('./../navbar/footer.scss').toString()]
})
export class FooterComponent {
    public player: Object = {displayName: 'Test'};
    public showAdmin: boolean = false;
    public showLogout: boolean = false;
    public appName: string;

    constructor(config: AppConfig) {
        this.appName = config.appName;
    }
}
