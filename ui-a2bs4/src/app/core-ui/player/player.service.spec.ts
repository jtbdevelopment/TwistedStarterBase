import {async} from '@angular/core/testing';
import {PlayerService} from './player.service';
import {Player} from './player.model';
describe('Service: player service', () => {
    let playerService: PlayerService;
    beforeEach(async(() => {
        playerService = new PlayerService();
    }));

    it('defaults to empty logged in and current player', () => {
        let current: Player;
        let loggedIn: Player;
        playerService.loggedInPlayer.subscribe(p => {
            loggedIn = p;
        });
        playerService.player.subscribe(p => {
            current = p;
        });

        expect(current).toBeDefined();
        expect(loggedIn).toBeDefined();
    });
});
