import {Component} from '@angular/core';
import {AtmosphereService} from './core-ui/atmosphere/atmosphere.service';
import {GameCache} from './core-ui/gamecache/gamecache.service';

@Component({
    selector: 'fountain-root',
    template: require('./root.component.html')
})
export class RootComponent {
    constructor(atmosphere: AtmosphereService, gameCache: GameCache) {
        //  TODO - better than this for atmosphere
        atmosphere.endPoint = '';
    }
}

