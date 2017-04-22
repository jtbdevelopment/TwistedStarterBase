import {Component, Inject} from '@angular/core';
import {AppConfig} from '../app.config';
import {PlayerService} from '../core-ui/player/player.service';

@Component({
    selector: 'navigation-bar',
    template: require('./navigation-bar.component.html'),
    styles: [require('./navigation-bar.component.scss').toString()]
})
export class NavigationBarComponent {
    playerName: string;
    showAdmin: boolean = false;
    showLogout: boolean = false;
    appName: string;
    playerLoaded: boolean = false;

    constructor(@Inject('AppConfig') private config: AppConfig, private playerService: PlayerService) {
        this.appName = config.appName;
        playerService.loggedInPlayer.subscribe(login => {
            this.showAdmin = login.adminUser;
            this.playerLoaded =
                login !== undefined &&
                login.displayName !== undefined &&
                login.displayName !== '';
        });
        playerService.player.subscribe(user => {
            this.showLogout = (user.source === 'MANUAL');
            this.playerName = user.displayName;
        });
    }
}

