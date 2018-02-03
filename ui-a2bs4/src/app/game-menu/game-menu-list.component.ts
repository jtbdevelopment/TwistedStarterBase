import {Component, Inject} from '@angular/core';
import {HelpDisplayService} from '../help/help-display.service';
import {AbstractHelpDisplayingComponent} from '../help/abstract-help.component';
import {GameClassifier} from 'jtb-core-games-ui';

@Component({
  selector: 'app-game-menu-list',
  templateUrl: './game-menu-list.component.html',
  styleUrls: ['./game-menu-list.component.scss']
})
export class GameMenuListComponent extends AbstractHelpDisplayingComponent {
  public categories: string[] = [];
  public styles: string[] = [];
  public icons: Map<string, string> = new Map<string, string>();

  constructor(@Inject('GameClassifier') private gameClassifier: GameClassifier<any>,
              protected helpDisplay: HelpDisplayService) {
    super(helpDisplay);
    gameClassifier.getIcons().subscribe(i => this.icons = i);
    gameClassifier.getClassifications().subscribe(c => {
      this.categories = c;
      this.styles = [];
      this.categories.forEach(category => {
        this.styles.push(category.toLowerCase().split(' ').join('-').split('.').join(''));
      });
    });
  }
}
