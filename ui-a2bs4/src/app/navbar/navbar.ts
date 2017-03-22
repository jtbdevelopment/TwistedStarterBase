import {Component} from '@angular/core';
import {AppConfig} from '../appconfig';
import {PlayerService} from '../core-ui/player/playerService';

@Component({
    selector: 'navigation-bar',
    template: require('./navbar.html'),
    styles: [require('./navbar.scss').toString()]
})
export class NavBarComponent {
    playerName: string;
    showAdmin: boolean = false;
    showLogout: boolean = false;
    appName: string;

    constructor(config: AppConfig, playerService: PlayerService) {
        this.appName = config.appName;
        playerService.loggedInPlayer.subscribe(login => {
            this.showAdmin = login.adminUser;
        });
        playerService.player.subscribe(user => {
            this.showLogout = (user.source === 'Manual');
            this.playerName = user.displayName;
        });
    }

    logout(): void {
        //  TODO
        console.log('logout ' + this.playerName);
    }

    hoverMenu(): void {
    }

    stopHoverMenu(): void {
    }

    toggleMenu(): void {
    }
}
