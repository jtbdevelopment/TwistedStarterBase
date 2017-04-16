import {Component, Input} from '@angular/core';
import {GameCacheService} from '../core-ui/gamecache/game-cache.service';
import {Game} from '../core-ui/games/game.model';
@Component({
    selector: 'game-menu-category-list',
    template: require('./game-menu-category-list.component.html')
})
export class GameMenuCategoryListComponent {
    @Input() public category: string;
    @Input() public icon: string;
    @Input() public style: string;
    public games: Game[] = [];
    public isCollapsed: boolean = false;

    constructor(private gameCache: GameCacheService) {
    }

    //noinspection JSUnusedGlobalSymbols
    ngOnInit() {
        this.gameCache.getGamesForCategory(this.category).subscribe(g => {
            this.games = g;
            console.warn(this.games)
        });
    }

    public toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
