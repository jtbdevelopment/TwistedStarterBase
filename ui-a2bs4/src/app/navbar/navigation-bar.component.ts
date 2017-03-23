import {Component, NgModule} from '@angular/core';
import {AppConfig} from '../appconfig';
import {PlayerService} from '../core-ui/player/player.service';
import {BrowserModule} from '@angular/platform-browser';
import {JTBCoreUI} from '../core-ui/jtb.core.ui.module';
import {NavigationBarGameMenuToggleComponent} from './navigation-bar-game-menu-toggle.component';
import {NavigationBarNewGameComponent} from './navigation-bar-new-game.component';
import {NavigationBarRightMenuComponent} from './navigation-bar-right-menu.component';

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

    constructor(config: AppConfig, playerService: PlayerService) {
        this.appName = config.appName;
        playerService.loggedInPlayer.subscribe(login => {
            this.showAdmin = login.adminUser;
            this.playerLoaded =
                login !== undefined &&
                login.displayName !== undefined &&
                login.displayName !== '';
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
}

