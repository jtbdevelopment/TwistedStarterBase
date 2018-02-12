import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {GameMenuGameItemComponent} from './game-menu-game-item.component';
import {Game, MapKeysPipe} from 'jtb-core-games-ui';


describe('Component:  game menu game item component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                GameMenuGameItemComponent,
                MapKeysPipe
            ],
        });
        TestBed.compileComponents();
    });

    it('displays game', () => {
        const fixture = TestBed.createComponent(GameMenuGameItemComponent);
        fixture.componentInstance.game = new Game({
            id: '1234',
            gamePhase: 'Playing',
            players: {'md51': 'p1', 'md52': 'p2'},
            playerImages: {'md51': '', 'md52': ''}
        });
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });

    it('default describe game function just returns todo', () => {
        const fixture = TestBed.createComponent(GameMenuGameItemComponent);
        expect(fixture.componentInstance.describeGame()).toEqual('TODO');
    });

});
