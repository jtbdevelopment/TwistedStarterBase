import {Component, Inject} from '@angular/core';
import {FacebookInviteService} from '../../core-games-ui/facebook/facebook-invite.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppConfig} from '../../core-games-ui/appconfig.interface';
import {FriendsService} from '../../core-games-ui/friends/friends.service';
import {Invitable} from '../../core-games-ui/friends/invitable.model';

@Component({
    selector: 'invite-friends',
    template: require('./invite.component.html'),
})
export class InviteComponent {
    public invitable: Invitable[] = [];
    public chosen: Invitable[] = [];

    constructor(private facebookInviteService: FacebookInviteService,
                private friendService: FriendsService,
                private modalRef: NgbActiveModal,
                @Inject('AppConfig') private config: AppConfig) {
        this.friendService.invitableFriends.subscribe(f => {
            this.invitable = f;
            this.chosen = [];
        });
    }

    public cancel(): void {
        this.modalRef.dismiss();
    }

    public inviteFriends(): void {
        this.facebookInviteService.inviteFriends(this.chosen, this.config.inviteFriendsMessage);
        this.modalRef.close();
    }
}
