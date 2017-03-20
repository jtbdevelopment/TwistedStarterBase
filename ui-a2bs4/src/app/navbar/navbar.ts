import {Component} from '@angular/core';
import {AppConfig} from '../appconfig';
import {Observable} from "rxjs";
import {PlayerDetails} from "../core-ui/player/PlayerDetails";

@Component({
    selector: 'navbar',
    template: require('./navbar.html'),
    styles: [require('./navbar.scss').toString()]
})
export class NavBarComponent {
    //  should be in service?
    public player: Observable<PlayerDetails> = new Observable();
    public showAdmin: boolean = false;
    public showLogout: boolean = false;
    appName: string;

    constructor(config: AppConfig) {
        this.appName = config.appName;
    }
}
