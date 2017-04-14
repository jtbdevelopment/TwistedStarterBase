import {Component, Input} from '@angular/core';
import {GameMenuService} from '../game-menu/game-menu.service';

@Component({
    selector: 'navigation-bar-game-menu-toggle',
    template: require('./navigation-bar-game-menu-toggle.component.html')
})
export class NavigationBarGameMenuToggleComponent {
    @Input() playerLoaded: boolean;

    private beforeHoverMenuValue: boolean;
    private hovering: boolean = false;

    constructor(private gameMenuService: GameMenuService) {
    }

    hoverGameMenu(): void {
        this.beforeHoverMenuValue = this.gameMenuService.getShowGames();
        console.log('start hover: ' + this.beforeHoverMenuValue);
        this.gameMenuService.setShowGames(true);
        this.hovering = true;
    }

    stopHoverGameMenu(): void {
        this.gameMenuService.setShowGames(this.beforeHoverMenuValue);
        console.log('stop hover: ' + this.beforeHoverMenuValue);
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
