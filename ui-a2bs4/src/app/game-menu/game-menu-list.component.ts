import {Component, Inject} from '@angular/core';
import {GameClassifier} from '../core-ui/gamecache/game-classifier.serviceinterface';
@Component({
    selector: 'game-menu-list',
    template: require('./game-menu-list.component.html'),
    styles: [require('./game-menu-list.component.scss').toString()]
})
export class GameMenuListComponent {
    public categories: string[] = [];
    public styles: string[] = [];
    public icons: Map<string, string> = new Map<string, string>();

    constructor(@Inject('GameClassifier') private gameClassifier: GameClassifier) {
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
