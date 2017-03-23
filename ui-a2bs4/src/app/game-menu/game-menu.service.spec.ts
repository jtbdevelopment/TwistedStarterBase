import {async} from '@angular/core/testing';
import {GameMenuService} from './game-menu.service';
describe('Service: game menu service', () => {
    let gameMenuService: GameMenuService;
    beforeEach(async(() => {
        gameMenuService = new GameMenuService();
    }));

    it('defaults to true', () => {
        expect(gameMenuService.getShowGames()).toBeTruthy();
        let show: boolean = false;
        gameMenuService.showGames.subscribe(x => {
            show = x;
        });
        expect(show).toBeTruthy();
    });

    it('propagates changes', () => {
        let show: boolean = false;
        gameMenuService.showGames.subscribe(x => {
            show = x;
        });
        expect(show).toBeTruthy();
        gameMenuService.setShowGames(false);
        expect(show).toBeFalsy();
        expect(gameMenuService.getShowGames()).toBeFalsy();
    });
});
