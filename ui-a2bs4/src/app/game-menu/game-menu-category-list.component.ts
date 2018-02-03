import {Component, Input, OnInit} from '@angular/core';
import {Game, GameCacheService} from 'jtb-core-games-ui';


@Component({
  selector: 'app-game-menu-category-list',
  templateUrl: './game-menu-category-list.component.html',
  styleUrls: ['./game-menu-category-list.component.scss']
})
export class GameMenuCategoryListComponent implements OnInit {
  @Input() public category: string;
  @Input() public icon: string;
  @Input() public style: string;
  public games: Game[] = [];
  public isCollapsed: boolean = false;

  constructor(private gameCache: GameCacheService) {
  }

  ngOnInit() {
    this.gameCache.getGamesForCategory(this.category).subscribe(g => {
      this.games = Object.assign([], g);
      this.games.sort((a, b) => {
        if (a.lastUpdate > b.lastUpdate) {
          return 1;
        }
        if (a.lastUpdate === b.lastUpdate) {
          return 0;
        }
        return -1;
      });
    });
  }

  public toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
