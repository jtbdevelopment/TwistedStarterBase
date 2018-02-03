import {Component, Input} from '@angular/core';
import {Game} from 'jtb-core-games-ui';

@Component({
  selector: 'app-game-menu-game-item',
  templateUrl: './game-menu-game-item.component.html',
  styleUrls: ['./game-menu-game-item.component.scss']
})
export class GameMenuGameItemComponent {
  @Input() public game: Game;
  @Input() public style: string;

  //  TODO - TSB
  public describeGame(): string {
    return 'TODO';
  }
}
