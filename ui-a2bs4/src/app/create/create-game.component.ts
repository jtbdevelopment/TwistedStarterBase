import {Component} from '@angular/core';
import {FeatureCacheService} from '../core-games-ui/features/feature-cache.service';
import {FeatureGroup} from '../core-games-ui/features/feature-group.model';
import {FriendsService} from '../core-games-ui/friends/friends.service';
import {Friend} from '../core-games-ui/friends/friend.model';
import {BootstrapActionsService} from '../core-games-ui-bs/actions/bootstrap-actions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InviteComponent} from '../core-games-ui-bs/invite/invite.component';

@Component({
    selector: 'create-game',
    template: require('./create-game.component.html'),
    styles: [require('./create-game.component.scss').toString()]
})
export class CreateGameComponent {
    public choices = {};
    public groups: FeatureGroup[] = [];
    public friends: Friend[] = [];
    public chosenFriends: Friend[] = [];
    //  TODO - TSB - customize when create is enabled
    public disableCreate: boolean = true;
    public createGameText: String = 'Create Game!';

    constructor(private featureCache: FeatureCacheService,
                private friendService: FriendsService,
                private ngbModal: NgbModal,
                private gameActions: BootstrapActionsService) {
        featureCache.features.subscribe(g => {
            this.disableCreate = true;
            this.groups = g;
            this.groups.forEach(group => {
                group.features.forEach(feature => {
                    this.choices[feature.feature] = feature.options[0].option;
                });
            });
            this.disableCreate = this.groups.length === 0;
        });
        friendService.friends.subscribe(f => {
            this.friends = f;
        });
        friendService.refreshFriends();
    }

    public inviteFriends(): void {
        this.ngbModal.open(InviteComponent);
    }

    public createGame(): void {
        this.createGameText = 'Creating game...';
        this.disableCreate = true;

        let featureSet = [];
        for (let choice in this.choices) {
            featureSet.push(this.choices[choice]);
        }
        let players = this.chosenFriends.map(function (player: Friend) {
            return player.md5;
        });
        let playersAndFeatures = {'players': players, 'features': featureSet};
        this.gameActions.newGame(playersAndFeatures);
    }
}
