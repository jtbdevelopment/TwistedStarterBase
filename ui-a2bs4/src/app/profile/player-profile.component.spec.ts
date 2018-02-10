import {TestBed} from '@angular/core/testing';
import {PlayerProfileComponent} from './player-profile.component';
import {Player, PlayerService} from 'jtb-core-games-ui';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {from} from 'rxjs/observable/from';

export class MockPlayerService {
    static playerSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());

    player: Observable<Player> = from<Player>(MockPlayerService.playerSubject);
}

describe('player profile component', () => {
    const player = new Player({
        displayName: 'Name',
        source: 'test',
        imageUrl: '',
        gameSpecificPlayerAttributes: {freeGamesUsedToday: 20}
    });
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PlayerProfileComponent
            ],
            providers: [
                {provide: PlayerService, useClass: MockPlayerService}
            ],
        });
        TestBed.compileComponents();
        MockPlayerService.playerSubject.next(player);
    });

    it('should render basics', () => {
        const fixture = TestBed.createComponent(PlayerProfileComponent);
        fixture.detectChanges();
        const navBar = fixture.nativeElement;
        expect(fixture.componentInstance.player).toEqual(player);
        expect(fixture).toMatchSnapshot();
    });

    it('should update for a player', () => {
        const fixture = TestBed.createComponent(PlayerProfileComponent);
        fixture.detectChanges();
        const navBar = fixture.nativeElement;
        expect(fixture.componentInstance.player).toEqual(player);

        const newPlayer: Player = new Player({
            displayName: 'New Name',
            source: 'test2',
            imageUrl: '',
            gameSpecificPlayerAttributes: {freeGamesUsedToday: 30}
        });

        MockPlayerService.playerSubject.next(newPlayer);
        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
    });
});
