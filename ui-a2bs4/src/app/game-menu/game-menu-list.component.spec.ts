import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {GameMenuListComponent} from './game-menu-list.component';
import {HelpDisplayService} from '../help/help-display.service';
import {NgbModule, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {from} from 'rxjs/observable/from';

class MockGameClassifier {
    public static classifications: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public static icons: BehaviorSubject<Map<string, string>> = new BehaviorSubject<Map<string, string>>(new Map<string, string>());

    public getClassifications(): Observable<string[]> {
        return from(MockGameClassifier.classifications);
    }

    //  Game buckets to icons - can return empty map if not initialized
    public getIcons(): Observable<Map<string, string>> {
        return from(MockGameClassifier.icons);
    }

}

@Component({
    selector: 'game-menu-category-list',
    template: '<p>{{category}}</p><p>{{style}}</p><p>{{icon}}</p>'
})
class MockCategoryListComponent {
    @Input() public category: string;
    @Input() public icon: string;
    @Input() public style: string;
}

describe('Component:  game menu list component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule
            ],
            declarations: [
                GameMenuListComponent,
                MockCategoryListComponent
            ],
            providers: [
                {provide: 'GameClassifier', useClass: MockGameClassifier},
                HelpDisplayService,
                NgbPopoverConfig
            ]
        });
        TestBed.compileComponents();
    });

    it('initializes', () => {
        const fixture = TestBed.createComponent(GameMenuListComponent);

        fixture.detectChanges();
        expect(fixture.componentInstance.categories).toEqual([]);
        expect(fixture.componentInstance.styles).toEqual([]);
        expect(fixture.componentInstance.icons.size).toEqual(0);
    });

    it('subscribes to game classifier', () => {
        const fixture = TestBed.createComponent(GameMenuListComponent);

        const icons = new Map<string, string>();
        icons.set('C1', 'icon1');
        icons.set('Category 2', 'icon2');
        icons.set('Category Number.3', 'icon3');
        const categories = ['C1', 'Category 2', 'Category Number.3'];
        MockGameClassifier.classifications.next(categories);
        MockGameClassifier.icons.next(icons);
        fixture.detectChanges();

        expect(fixture.componentInstance.categories).toEqual(categories);
        const expectedStyles = ['c1', 'category-2', 'category-number3'];
        expect(fixture.componentInstance.styles).toEqual(expectedStyles);
        expect(JSON.stringify(fixture.componentInstance.icons)).toEqual(JSON.stringify(icons));

        const querySelectorAll = fixture.nativeElement.querySelectorAll('game-menu-category-list');
        expect(querySelectorAll.length).toEqual(3);
        expect(querySelectorAll[0].textContent).toEqual(categories[0] + expectedStyles[0] + 'icon1');
        expect(querySelectorAll[1].textContent).toEqual(categories[1] + expectedStyles[1] + 'icon2');
        expect(querySelectorAll[2].textContent).toEqual(categories[2] + expectedStyles[2] + 'icon3');

    });

    it('toggling help on/off shows/hides popover', fakeAsync(inject([HelpDisplayService], (helpService) => {
        const fixture = TestBed.createComponent(GameMenuListComponent);
        fixture.detectChanges();
        helpService.toggleHelp();
        tick();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.popover').length).toBeCloseTo(1);
        helpService.toggleHelp();
        tick();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.popover').length).toBeCloseTo(0);
    })));
});
