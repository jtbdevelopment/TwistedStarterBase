import {Component, Input} from '@angular/core';
import {PlayerService} from '../core-ui/player/player.service';

@Component({
    selector: 'navigation-bar-right-menu',
    template: require('./navigation-bar-right-menu.component.html')
})
export class NavigationBarRightMenuComponent {
    @Input() playerLoaded: boolean;
    @Input() showAdmin: boolean;
    @Input() showLogout: boolean;

    constructor(private playerService: PlayerService) {
    }

    public logout(): void {
        this.playerService.logout();
    }
}
