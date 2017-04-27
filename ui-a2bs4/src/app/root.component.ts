import {Component} from '@angular/core';
import {AtmosphereService} from './core-ui/atmosphere/atmosphere.service';
import {GameMenuService} from './game-menu/game-menu.service';

@Component({
    selector: 'fountain-root',
    template: require('./root.component.html')
})
export class RootComponent {
    public showGames: boolean = false;

    constructor(atmosphere: AtmosphereService, menuService: GameMenuService) {
        atmosphere.endPoint = '';
        menuService.showGames.subscribe(x => this.showGames = x);
    }
}

