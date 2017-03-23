import {Component, Input} from '@angular/core';

@Component({
    selector: 'navigation-bar-new-game',
    template: require('./navigation-bar-new-game.component.html')
})
export class NavigationBarNewGameComponent {
    @Input() playerLoaded: boolean;
}
