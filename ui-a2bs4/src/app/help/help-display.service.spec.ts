import {async, fakeAsync} from '@angular/core/testing';
import {HelpDisplayService} from './help-display.service';

describe('Service: help display service', () => {
    let help: HelpDisplayService;
    let show: boolean;
    beforeEach(async(() => {
        show = null;
        help = new HelpDisplayService();
        help.showHelp.subscribe(x => {
            show = x;
        });
    }));

    it('defaults to false', () => {
        expect(show).toBeFalsy();
    });

    it('changes when toggled', fakeAsync(() => {
        expect(show).toBeFalsy();
        help.toggleHelp();
        expect(show).toBeTruthy();
        help.toggleHelp();
        expect(show).toBeFalsy();
        help.toggleHelp();
        expect(show).toBeTruthy();
    }));
});