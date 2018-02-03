import {Component, Input} from '@angular/core';
import {Game} from 'jtb-core-games-ui';

@Component({
    selector: 'game-menu-game-item',
    templateUrl: './game-menu-game-item.component.html'
})
export class GameMenuGameItemComponent {
    @Input() public game: Game;
    @Input() public style: string;

    //  TODO - TSB
    public describeGame(): string {
        return 'TODO';
    }
}
