import {Component} from '@angular/core';
import {AtmosphereService} from './core-ui/livefeed/atmosphere.service';

@Component({
    selector: 'fountain-root',
    template: require('./root.component.html')
})
export class RootComponent {
    constructor(liveFeedService: AtmosphereService) {
        //  TODO - better than this for liveFeed
        liveFeedService.endPoint = '';
    }
}

