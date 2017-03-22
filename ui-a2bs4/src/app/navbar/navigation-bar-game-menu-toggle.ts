import {Component, Input} from '@angular/core';
import {GameMenuService} from '../game-menu/gamemenuservice';

@Component({
    selector: 'navigation-bar-game-menu-toggle',
    template: require('./navigation-bar-game-menu-toggle.html')
})
export class NavigationBarGameMenuToggleComponent {
    @Input() playerLoaded: boolean;

    private beforeHoverMenuValue: boolean;

    constructor(private gameMenuService: GameMenuService) {
    }

    hoverGameMenu(): void {
        this.beforeHoverMenuValue = this.gameMenuService.getShowGames();
        this.gameMenuService.setShowGames(true);
    }

    stopHoverGameMenu(): void {
        this.gameMenuService.setShowGames(this.beforeHoverMenuValue);
    }

    toggleGameMenu(): void {
        this.gameMenuService.setShowGames(!this.gameMenuService.getShowGames());
    }
}
