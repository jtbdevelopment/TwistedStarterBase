import {async} from '@angular/core/testing';
import {GameMenuService} from './game-menu.service';
describe('Service: game menu service', () => {
    let gameMenuService: GameMenuService;
    beforeEach(async(() => {
        gameMenuService = new GameMenuService();
    }));

    it('defaults to false', () => {
        expect(gameMenuService.getShowGames()).toBeFalsy();
        let show: boolean = false;
        gameMenuService.showGames.subscribe(x => {
            show = x;
        });
        expect(show).toBeFalsy();
    });

    it('propagates changes', () => {
        let show: boolean = false;
        gameMenuService.showGames.subscribe(x => {
            show = x;
        });
        expect(show).toBeFalsy();
        gameMenuService.setShowGames(true);
        expect(show).toBeTruthy();
        expect(gameMenuService.getShowGames()).toBeTruthy();
    });
});
