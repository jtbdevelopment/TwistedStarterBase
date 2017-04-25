import {NgModule} from '@angular/core';
import {GameMenuService} from './game-menu.service';
import {GameMenuListComponent} from './game-menu-list.component';
import {GameMenuCategoryListComponent} from './game-menu-category-list.component';
import {GameMenuGameItemComponent} from './game-menu-game-item.component';
import {JTBCoreUI} from '../core-ui/jtb.core.ui.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        NgbModule,
        JTBCoreUI
    ],
    exports: [
        GameMenuListComponent
    ],
    providers: [
        GameMenuService,
    ],
    declarations: [
        GameMenuListComponent,
        GameMenuCategoryListComponent,
        GameMenuGameItemComponent
    ]
})
export class GameMenuModule {
}

