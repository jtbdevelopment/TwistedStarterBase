import {Component, Input} from '@angular/core';

@Component({
    selector: 'navigation-bar-right-menu',
    template: require('./navigation-bar-right-menu.component.html')
})
export class NavigationBarRightMenuComponent {
    @Input() playerLoaded: boolean;
    @Input() showAdmin: boolean;
    @Input() showLogout: boolean;
}
