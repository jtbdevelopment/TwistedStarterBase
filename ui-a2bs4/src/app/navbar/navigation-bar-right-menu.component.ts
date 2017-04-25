import {Component, Input} from '@angular/core';
import {PlayerService} from '../core-ui/player/player.service';
import {HelpDisplayService} from '../help/help-display.service';
import {AbstractHelpDisplayingComponent} from '../help/abstract-help.component';

@Component({
    selector: 'navigation-bar-right-menu',
    template: require('./navigation-bar-right-menu.component.html')
})
export class NavigationBarRightMenuComponent extends AbstractHelpDisplayingComponent {
    @Input() playerLoaded: boolean;
    @Input() showAdmin: boolean;
    @Input() showLogout: boolean;

    constructor(private playerService: PlayerService, protected helpDisplay: HelpDisplayService) {
        super(helpDisplay);
    }

    public logout(): void {
        this.playerService.logout();
    }

    public toggleHelp(): void {
        this.helpDisplay.toggleHelp();
    }
}
