import {GameMenuService} from './game-menu.service';
import {MessageBusService} from 'jtb-core-games-ui';

describe('Service: game menu service', () => {
  let gameMenuService: GameMenuService;
  let bus: MessageBusService;
  let show: boolean;
  beforeEach(() => {
    show = null;
    bus = new MessageBusService();
    gameMenuService = new GameMenuService(bus);
    gameMenuService.showGames.subscribe(x => {
      show = x;
    });
  });

  it('defaults to false', () => {
    expect(gameMenuService.getShowGames()).toBeFalsy();
    expect(show).toBeFalsy();
  });

  it('changes when connection status changes', () => {
    expect(gameMenuService.getShowGames()).toBeFalsy();
    expect(show).toBeFalsy();
    bus.connectionStatus.next(true);
    expect(gameMenuService.getShowGames()).toBeTruthy();
    expect(show).toBeTruthy();
    bus.connectionStatus.next(false);
    expect(gameMenuService.getShowGames()).toBeFalsy();
    expect(show).toBeFalsy();
    bus.connectionStatus.next(true);
    expect(gameMenuService.getShowGames()).toBeTruthy();
    expect(show).toBeTruthy();
  });

  it('propagates changes', () => {
    expect(show).toBeFalsy();
    gameMenuService.setShowGames(true);
    expect(show).toBeTruthy();
    expect(gameMenuService.getShowGames()).toBeTruthy();
  });
});
