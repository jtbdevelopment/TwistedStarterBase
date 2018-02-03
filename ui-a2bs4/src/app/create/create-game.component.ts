import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FeatureCacheService, FeatureGroup, Friend, FriendsService} from 'jtb-core-games-ui';
import {BootstrapActionsService, InviteComponent} from 'jtb-core-games-bootstrap-ui';

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.scss']
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
