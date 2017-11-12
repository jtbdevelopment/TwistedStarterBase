import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {GameMenuCategoryListComponent} from './game-menu-category-list.component';
import {GameCacheService} from '../core-games-ui/gamecache/game-cache.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {MultiPlayerGame} from '../core-games-ui/games/multi-player-game.model';
import {Game} from '../core-games-ui/games/game.model';
import {SinglePlayerGame} from '../core-games-ui/games/single-player-game.model';
import {Component, Input} from '@angular/core';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

class MockGameCache {
    public static games: Map<string, BehaviorSubject<any[]>> = new Map<string, BehaviorSubject<any[]>>();

    public getGamesForCategory(category: string): Observable<any[]> {
        return MockGameCache.games.get(category);
    }
}

@Component({
    selector: 'game-menu-game-item',
    template: '<p>{{style}}</p><span>{{game.id}}</span>'
})
class MockGameItemComponent {
    @Input() public game: Game;
    @Input() public style: string;
}

describe('Component:  game menu category list component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbCollapseModule
            ],
            declarations: [
                GameMenuCategoryListComponent,
                MockGameItemComponent
            ],
            providers: [
                {provide: GameCacheService, useClass: MockGameCache}
            ]
        });
        TestBed.compileComponents();
    }));

    it('initializes and subscribes to category from game cache', fakeAsync(() => {
        const fixture = TestBed.createComponent(GameMenuCategoryListComponent);
        let expectedGames = [
            new Game({id: '1', lastUpdate: 10}),
            new MultiPlayerGame({id: '2', lastUpdate: 1}),
            new SinglePlayerGame({id: '3', lastUpdate: 5})
        ];
        let category = 'cat';
        let style = 's';
        MockGameCache.games.set(category, new BehaviorSubject([]));
        fixture.componentInstance.category = category;
        fixture.componentInstance.style = style;
        fixture.detectChanges();
        expect(fixture.componentInstance.games).toEqual([]);
        expect(fixture.componentInstance.isCollapsed).toBeFalsy();
        MockGameCache.games.get(category).next(expectedGames);
        tick();
        expect(fixture.componentInstance.games).toEqual([expectedGames[1], expectedGames[2], expectedGames[0]]);
        fixture.detectChanges();

        let querySelectorAll = fixture.nativeElement.querySelectorAll('game-menu-game-item');
        expect(querySelectorAll.length).toEqual(3);
        expect(querySelectorAll[0].textContent).toEqual(style + expectedGames[1].id);
        expect(querySelectorAll[1].textContent).toEqual(style + expectedGames[2].id);
        expect(querySelectorAll[2].textContent).toEqual(style + expectedGames[0].id);
    }));

    it('test toggle collapse', () => {
        const fixture = TestBed.createComponent(GameMenuCategoryListComponent);
        expect(fixture.componentInstance.isCollapsed).toBeFalsy();
        fixture.componentInstance.toggleCollapse();
        expect(fixture.componentInstance.isCollapsed).toBeTruthy();
        fixture.componentInstance.toggleCollapse();
        expect(fixture.componentInstance.isCollapsed).toBeFalsy();
    });
});
