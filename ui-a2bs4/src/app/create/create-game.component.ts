import {Component} from '@angular/core';
import {FeatureCacheService} from '../core-ui/features/feature-cache.service';
import {FeatureGroup} from '../core-ui/features/feature-group.model';
import {FriendsService} from '../core-ui/friends/friends.service';
import {Friend} from '../core-ui/friends/friend.model';
import {Invitable} from '../core-ui/friends/invitable.model';

@Component({
    selector: 'create-game',
    template: require('./create-game.component.html'),
    styles: [require('./create-game.component.scss').toString()]
})
export class CreateGameComponent {
    public choices = {};
    public groups: FeatureGroup[] = [];
    public friends: Friend[] = [];
    public invitable: Invitable[] = [];

    constructor(private featureCache: FeatureCacheService, private friendService: FriendsService) {
        featureCache.features.subscribe(g => {
            this.groups = g;
            this.groups.forEach(group => {
                group.features.forEach(feature => {
                    this.choices[feature.feature] = feature.options[0].option;
                });
            });
        });
        friendService.invitableFriends.subscribe(i => {
            this.invitable = i;
        });
        friendService.friends.subscribe(f => {
            this.friends = f;
        });
        friendService.refreshFriends();
    }
}
