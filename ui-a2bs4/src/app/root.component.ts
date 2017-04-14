import {Component} from '@angular/core';
import {AtmosphereService} from './core-ui/atmosphere/atmosphere.service';
import {GameCacheService} from './core-ui/gamecache/game-cache.service';
import {GameMenuService} from './game-menu/game-menu.service';

@Component({
    selector: 'fountain-root',
    template: require('./root.component.html')
})
export class RootComponent {
    constructor(atmosphere: AtmosphereService, gameCache: GameCacheService, menuService: GameMenuService) {
        //  TODO - better than this for atmosphere
        atmosphere.endPoint = '';
    }
}

