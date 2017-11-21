import {Component} from '@angular/core';
import {async, inject, TestBed} from '@angular/core/testing';
import {RootComponent} from './root.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {GameMenuService} from './game-menu/game-menu.service';

@Component({selector: 'navigation-bar', template: '<div class="nb"></div>'})
class MockNavBarComponent {
}

@Component({selector: 'game-menu-list', template: '<div class="gml"></div>'})
class MockGameMenuComponent {
}

@Component({selector: 'router-outlet', template: '<div class="ro"></div>'})
class MockRouterOutlet {
}

class MockGameMenuService {
    public showGames: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}


describe('Root Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                {provide: GameMenuService, useClass: MockGameMenuService}
            ],
            declarations: [
                RootComponent,
                MockNavBarComponent,
                MockGameMenuComponent,
                MockRouterOutlet
            ]
        });
        TestBed.compileComponents();
    }));

    it('should render the shell when no show games', () => {
        const fixture = TestBed.createComponent(RootComponent);
        fixture.detectChanges();
        const main = fixture.nativeElement;
        expect(main.querySelector('.nb')).not.toBeNull();
        expect(main.querySelector('.gml')).toBeNull();
        expect(main.querySelector('.ro')).not.toBeNull();
        expect(main.querySelector('.col-12')).not.toBeNull();
        expect(main.querySelector('.col-10')).toBeNull();
    });

    it('should render the shell when show games', inject([GameMenuService], (gameMenuService) => {
        const fixture = TestBed.createComponent(RootComponent);
        gameMenuService.showGames.next(true);
        fixture.detectChanges();

        const main = fixture.nativeElement;
        expect(main.querySelector('.nb')).not.toBeNull();
        expect(main.querySelector('.gml')).not.toBeNull();
        expect(main.querySelector('.ro')).not.toBeNull();
        expect(main.querySelector('.col-12')).toBeNull();
        expect(main.querySelector('.col-10')).not.toBeNull();
    }));
});
