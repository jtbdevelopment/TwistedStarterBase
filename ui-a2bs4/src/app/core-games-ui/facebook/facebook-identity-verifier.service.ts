import {Injectable} from '@angular/core';
import {FacebookInitializerService} from './facebook-initializer.service';
import {PlayerService} from '../player/player.service';
import {Player} from '../player/player.model';

declare let FB: any;

@Injectable()
export class FacebookIdentifyVerifierService {
    constructor(private playerService: PlayerService, private fbInitializer: FacebookInitializerService) {
        this.playerService.loggedInPlayer.subscribe(p => {
            this.verifyPlayerAndFacebookMatch(p);
        });
    }

    private verifyPlayerAndFacebookMatch(player: Player): void {
        if (player.source === 'facebook') {
            this.fbInitializer.fbReady.then(() => {
                FB.getLoginStatus((response: any) => {
                    console.error('status');
                    if (response.status !== 'connected' ||
                        response.authResponse === undefined ||
                        response.authResponse === null ||
                        response.authResponse.userID !== player.sourceId) {
                        console.log('facebook verification failed');
                        this.playerService.logout();
                        console.log('facebook verification logged out');
                    }
                });
            });
        }
    }
}
