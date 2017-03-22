import {Component, Input} from "@angular/core";

@Component({
    selector: 'navigation-bar-game-menu-toggle',
    template: require('./navigation-bar-game-menu-toggle.html')
})
export class NavigationBarGameMenuToggleComponent {
    @Input() playerLoaded: boolean;

    hoverGameMenu(): void {
        //  TODO
    }

    stopHoverGameMenu(): void {
        //  TODO
    }

    toggleGameMenu(): void {
        //  TODO
    }
}
