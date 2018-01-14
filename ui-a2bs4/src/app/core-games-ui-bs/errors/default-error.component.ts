import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PlayerService} from '../../core-games-ui/player/player.service';

@Component({
    selector: 'ngbd-modal-content',
    template: require('./default-error.component.html')
})
export class DefaultErrorComponent {
    constructor(private activeModal: NgbActiveModal, private playerService: PlayerService) {
    }

    public dismissAndForceLogout() {
        this.activeModal.dismiss();
        this.playerService.forceLogout();
    }
}