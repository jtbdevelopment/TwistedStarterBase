import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {JTBCoreUI} from '../core-ui/jtb.core.ui.module';
import {NavigationBarGameMenuToggleComponent} from './navigation-bar-game-menu-toggle.component';
import {NavigationBarNewGameComponent} from './navigation-bar-new-game.component';
import {NavigationBarRightMenuComponent} from './navigation-bar-right-menu.component';
import {NavigationBarComponent} from './navigation-bar.component';
import {GameMenuModule} from '../game-menu/game-menu.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        JTBCoreUI,
        GameMenuModule,
        RouterModule
    ],
    exports: [
        NavigationBarComponent,
    ],
    declarations: [
        NavigationBarComponent,
        NavigationBarGameMenuToggleComponent,
        NavigationBarNewGameComponent,
        NavigationBarRightMenuComponent
    ]
})
export class NavigationBarModule {
}

