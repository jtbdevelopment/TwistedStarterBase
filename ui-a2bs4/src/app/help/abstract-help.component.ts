import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {QueryList, ViewChildren} from '@angular/core';
import {HelpDisplayService} from './help-display.service';

export class AbstractHelpDisplayingComponent {
    @ViewChildren('help') public helpPopovers: QueryList<NgbPopover>;

    constructor(protected helpDisplay: HelpDisplayService) {
        helpDisplay.showHelp.subscribe(x => {
            if (this.helpPopovers) {
                if (x) {
                    this.helpPopovers.forEach((help) => {
                        help.open();
                    });
                } else {
                    this.helpPopovers.forEach((help) => {
                        help.close();
                    });
                }
            }
        });
    }

}
