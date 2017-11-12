import {async, TestBed} from '@angular/core/testing';
import {PlayerService} from '../core-games-ui/player/player.service';
import {Player} from '../core-games-ui/player/player.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {PlayerProfileComponent} from './player-profile.component';

export class MockPlayerService {
    static playerSubject: BehaviorSubject<Player> = new BehaviorSubject(new Player());

    player: Observable<Player> = Observable.from<Player>(MockPlayerService.playerSubject);
}

describe('player profile component', () => {
    let player = new Player({
        displayName: 'Name',
        source: 'test',
        imageUrl: '',
        gameSpecificPlayerAttributes: {freeGamesUsedToday: 20}
    });
    beforeEach(async(() => {
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
    }));

    it('should render basics', () => {
        const fixture = TestBed.createComponent(PlayerProfileComponent);
        fixture.detectChanges();
        const navBar = fixture.nativeElement;
        expect(fixture.componentInstance.player).toEqual(player);
        let content = navBar.querySelector('table').textContent.trim();
        expect(content).toContain(player.displayName);
        expect(content).toContain(player.source);
        expect(content).toContain(player.gameSpecificPlayerAttributes.freeGamesUsedToday);
    });

    it('should update for a player', () => {
        const fixture = TestBed.createComponent(PlayerProfileComponent);
        fixture.detectChanges();
        const navBar = fixture.nativeElement;
        expect(fixture.componentInstance.player).toEqual(player);

        let newPlayer: Player = new Player({
            displayName: 'New Name',
            source: 'test2',
            imageUrl: '',
            gameSpecificPlayerAttributes: {freeGamesUsedToday: 30}
        });

        MockPlayerService.playerSubject.next(newPlayer);
        fixture.detectChanges();

        let content = navBar.querySelector('table').textContent.trim();
        expect(content).toContain(newPlayer.displayName);
        expect(content).toContain(newPlayer.source);
        expect(content).toContain(newPlayer.gameSpecificPlayerAttributes.freeGamesUsedToday);
    });
});
