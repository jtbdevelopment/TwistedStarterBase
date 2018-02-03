import {Component, Inject, Input} from '@angular/core';
import {GameMenuService} from '../game-menu/game-menu.service';
import {AbstractHelpDisplayingComponent} from '../help/abstract-help.component';
import {HelpDisplayService} from '../help/help-display.service';
import {AppConfig} from 'jtb-core-games-ui';

@Component({
    selector: 'navigation-bar-game-menu-toggle',
    templateUrl: './navigation-bar-game-menu-toggle.component.html'
})
export class NavigationBarGameMenuToggleComponent extends AbstractHelpDisplayingComponent {
    @Input() playerLoaded: boolean;

    private beforeHoverMenuValue: boolean;
    private hovering: boolean = false;

    constructor(@Inject('AppConfig') private config: AppConfig,
                private gameMenuService: GameMenuService,
                protected helpDisplay: HelpDisplayService) {
        super(helpDisplay);
    }

    hoverGameMenu(): void {
        if (this.config.hoverMenu) {
            this.beforeHoverMenuValue = this.gameMenuService.getShowGames();
            this.gameMenuService.setShowGames(true);
            this.hovering = true;
        }
    }

    stopHoverGameMenu(): void {
        if (this.config.hoverMenu) {
            this.gameMenuService.setShowGames(this.beforeHoverMenuValue);
            this.hovering = false;
        }
    }

    toggleGameMenu(): void {
        if (this.hovering) {
            this.stopHoverGameMenu();  // revert
        }
        this.gameMenuService.setShowGames(!this.gameMenuService.getShowGames());
        this.beforeHoverMenuValue = this.gameMenuService.getShowGames();
    }
}
