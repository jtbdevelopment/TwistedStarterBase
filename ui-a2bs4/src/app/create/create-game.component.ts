import {Component} from '@angular/core';
import {FeatureCacheService} from '../core-ui/features/feature-cache.service';
import {FeatureGroup} from '../core-ui/features/feature-group.model';
@Component({
    selector: 'create-game',
    template: require('./create-game.component.html'),
    styles: [require('./create-game.component.scss').toString()]
})
export class CreateGameComponent {
    public choices = {};
    public groups: FeatureGroup[] = [];

    constructor(private featureCache: FeatureCacheService) {
        featureCache.features.subscribe(g => {
            this.groups = g;
            this.groups.forEach(group => {
                group.features.forEach(feature => {
                    this.choices[feature.feature] = feature.options[0].option;
                });
            });
        });
    }
}
