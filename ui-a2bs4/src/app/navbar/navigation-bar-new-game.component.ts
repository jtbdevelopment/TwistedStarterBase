import {Component, Input} from '@angular/core';
import {AbstractHelpDisplayingComponent} from '../help/abstract-help.component';
import {HelpDisplayService} from '../help/help-display.service';

@Component({
    selector: 'navigation-bar-new-game',
    template: require('./navigation-bar-new-game.component.html')
})
export class NavigationBarNewGameComponent extends AbstractHelpDisplayingComponent {
    @Input() playerLoaded: boolean;

    constructor(protected helpDisplay: HelpDisplayService) {
        super(helpDisplay);
    }
}
