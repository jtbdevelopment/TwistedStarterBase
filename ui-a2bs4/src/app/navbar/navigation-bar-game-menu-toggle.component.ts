import {Component, Input} from '@angular/core';
import {GameMenuService} from '../game-menu/game-menu.service';
import {AbstractHelpDisplayingComponent} from '../help/abstract-help.component';
import {HelpDisplayService} from '../help/help-display.service';

@Component({
    selector: 'navigation-bar-game-menu-toggle',
    template: require('./navigation-bar-game-menu-toggle.component.html')
})
export class NavigationBarGameMenuToggleComponent extends AbstractHelpDisplayingComponent {
    @Input() playerLoaded: boolean;

    private beforeHoverMenuValue: boolean;
    private hovering: boolean = false;

    constructor(private gameMenuService: GameMenuService, protected helpDisplay: HelpDisplayService) {
        super(helpDisplay);
    }

    hoverGameMenu(): void {
        this.beforeHoverMenuValue = this.gameMenuService.getShowGames();
        this.gameMenuService.setShowGames(true);
        this.hovering = true;
    }

    stopHoverGameMenu(): void {
        this.gameMenuService.setShowGames(this.beforeHoverMenuValue);
        this.hovering = false;
    }

    toggleGameMenu(): void {
        if (this.hovering) {
            this.stopHoverGameMenu();  // revert
        }
        this.gameMenuService.setShowGames(!this.gameMenuService.getShowGames());
        this.beforeHoverMenuValue = this.gameMenuService.getShowGames();
    }
}
