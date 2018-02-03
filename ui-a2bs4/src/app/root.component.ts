import {Component} from '@angular/core';
import {GameMenuService} from './game-menu/game-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent {
  public showGames: boolean = false;

  constructor(menuService: GameMenuService) {
    menuService.showGames.subscribe(x => this.showGames = x);
  }
}

