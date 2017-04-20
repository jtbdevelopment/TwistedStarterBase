import {Component, Input} from '@angular/core';
import {Game} from '../core-ui/games/game.model';
@Component({
    selector: 'game-menu-game-item',
    template: require('./game-menu-game-item.component.html')
})
export class GameMenuGameItemComponent {
    @Input() public game: Game;
    @Input() public style: string;

    //  TODO - TSB
    public describeGame(): string {
        return 'TODO';
    }
}
