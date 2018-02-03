import {NgModule} from '@angular/core';
import {GameMenuService} from './game-menu.service';
import {GameMenuListComponent} from './game-menu-list.component';
import {GameMenuCategoryListComponent} from './game-menu-category-list.component';
import {GameMenuGameItemComponent} from './game-menu-game-item.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {JTBCoreGamesUI} from 'jtb-core-games-ui';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule,
    JTBCoreGamesUI
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
  constructor(private gameMenuService: GameMenuService) {
  }
}

