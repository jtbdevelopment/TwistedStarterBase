import {Component} from '@angular/core';
import {FeatureCacheService} from '../core-ui/features/feature-cache.service';
import {FeatureGroup} from '../core-ui/features/feature-group.model';
import {FriendsService} from '../core-ui/friends/friends.service';
import {Friend} from '../core-ui/friends/friend.model';
import {Invitable} from '../core-ui/friends/invitable.model';
import {BootstrapActionsService} from '../core-ui-bs/actions/bootstrap-actions.service';

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
    public chosenFriends: Friend[] = [];
    //  TODO - TSB - customize when create is enabled
    public disableCreate: boolean = false;
    public createGameText: String = 'Create Game!';

    constructor(private featureCache: FeatureCacheService, private friendService: FriendsService, private gameActions: BootstrapActionsService) {
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

    public createGame(): void {
        this.createGameText = 'Creating game...';
        this.disableCreate = true;

        let featureSet = [];
        for (let choice in this.choices) {
            featureSet.push(this.choices[choice]);
        }
        let players = this.chosenFriends.map(function (player) {
            return player.md5;
        });
        let playersAndFeatures = {'players': players, 'features': featureSet};
        console.log(JSON.stringify(playersAndFeatures));
        this.gameActions.newGame(playersAndFeatures);
    }
}
