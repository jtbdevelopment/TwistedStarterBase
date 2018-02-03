import {HelpDisplayService} from './help-display.service';

describe('Service: help display service', () => {
  let help: HelpDisplayService;
  let show: boolean;
  beforeEach(() => {
    show = null;
    help = new HelpDisplayService();
    help.showHelp.subscribe(x => {
      show = x;
    });
  });

  it('defaults to false', () => {
    expect(show).toBeFalsy();
  });

  it('changes when toggled', () => {
    expect(show).toBeFalsy();
    expect(help.isShown()).toBeFalsy();
    help.toggleHelp();
    expect(show).toBeTruthy();
    expect(help.isShown()).toBeTruthy();
    help.toggleHelp();
    expect(show).toBeFalsy();
    expect(help.isShown()).toBeFalsy();
    help.toggleHelp();
    expect(show).toBeTruthy();
    expect(help.isShown()).toBeTruthy();
  });
});
