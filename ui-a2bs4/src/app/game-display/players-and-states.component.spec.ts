import {TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ActivatedRoute, ParamMap, RouterModule} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {TSBGame} from '../game/tsb-game.model';
import {PlayersAndStatesComponent} from './players-and-states.component';
import {Game, GameCacheService, Player, PlayerService, StandardPhases} from 'jtb-core-games-ui';
import {BootstrapActionsService} from 'jtb-core-games-bootstrap-ui';
import {from} from 'rxjs/observable/from';
import {of} from 'rxjs/observable/of';

class MockBoostrapActions {
    accept = jasmine.createSpy('accept');
    reject = jasmine.createSpy('reject');
    quit = jasmine.createSpy('quit');
    rematch = jasmine.createSpy('rematch');
    declineRematch = jasmine.createSpy('decline');
}

const playerMD5 = 'my-md5';
const player: Player = new Player({md5: playerMD5});

class MockPlayerService {
    public player: Observable<Player> = from(new BehaviorSubject<Player>(player));
}

const gameID = 'the-game-id';
const game: TSBGame = new TSBGame();
let baseGame: TSBGame;

class MockGameCacheService {
    public testGameSubject: BehaviorSubject<Game> = new BehaviorSubject<Game>(game);

    public getGame(id: String): Observable<Game> {
        if (id === gameID) {
            return from(this.testGameSubject);
        } else {
            return null;
        }
    }
}

class ParamMapImpl implements ParamMap {
    readonly keys: string[] = ['gameID'];

    get(name: string): string | null {
        if (name === 'gameID') {
            return gameID;
        }
    }

    has(name: string): boolean {
        return name === 'gameID';
    }

    getAll(name: string): string[] {
        return [];
    }
}

describe('Component:  players and states component', () => {
    let actionService: MockBoostrapActions;
    let gameService: MockGameCacheService;
    let fixture;

    beforeEach(() => {
        baseGame = new TSBGame({
            players: {
                'md1': 'p1',
                'md2': 'p2',
                'md3': 'p3',
            },
            playerImages: {
                'md1': '/assets/avatars/maleprofile.png',
                'md2': '/p2.img',
                'md3': 'http://thenetwork.com/url?33f.img',
            },
            playerStates: {
                'md1': 'Accepted',
                'md2': 'Rejected',
                'md3': 'Pending',
            },
            playerProfiles: {
                'md1': 'link1.html',
                'md2': '/link2',
                'md3': 'http://www.com',
            },
            gamePhase: 'Challenged'
        });
        baseGame.players[playerMD5] = 'me';
        baseGame.playerStates[playerMD5] = 'Pending';
        baseGame.playerProfiles[playerMD5] = 'myprofile.pl';
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                RouterModule,
                FormsModule
            ],
            declarations: [
                PlayersAndStatesComponent
            ],
            providers: [
                {provide: PlayerService, useClass: MockPlayerService},
                {provide: GameCacheService, useClass: MockGameCacheService},
                {provide: BootstrapActionsService, useClass: MockBoostrapActions},
                {provide: ActivatedRoute, useValue: {paramMap: of(new ParamMapImpl())}}
            ]
        });
        TestBed.compileComponents();
        actionService = TestBed.get(BootstrapActionsService) as MockBoostrapActions;
        gameService = TestBed.get(GameCacheService) as MockGameCacheService;
        fixture = TestBed.createComponent(PlayersAndStatesComponent);
        fixture.detectChanges();
    });

    it('initializes', () => {
        expect(fixture.componentInstance.groups).toEqual(['Pending', 'Accepted', 'Rejected', 'Quit']);
        expect(fixture.componentInstance.groupCollapsed).toEqual({
            'Pending': false,
            'Accepted': false,
            'Rejected': false,
            'Quit': false
        });
        expect(fixture.componentInstance.groupPlayers).toEqual({
            'Pending': [],
            'Accepted': [],
            'Rejected': [],
            'Quit': []
        });
        expect(fixture.componentInstance.groupIcons).toEqual({
            Pending: 'question',
            Accepted: 'thumbs-up',
            Declined: 'thumbs-down',
            Quit: 'flag'
        });
        expect(fixture.componentInstance.showAccept).toBeFalsy();
        expect(fixture.componentInstance.showReject).toBeFalsy();
        expect(fixture.componentInstance.showRematch).toBeFalsy();
        expect(fixture.componentInstance.showQuit).toBeFalsy();
        expect(fixture.nativeElement.querySelectorAll('.btn-accept-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-decline-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-quit-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-rematch-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-end-rematch-game').length).toEqual(0);

        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Quit').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Accepted').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-players-group-Accepted').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Rejected').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-players-group-Rejected').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Pending').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-players-group-Pending').length).toEqual(0);

    });

    it('pending accept from player', () => {
        const newGame = new TSBGame(baseGame);
        gameService.testGameSubject.next(newGame);
        fixture.detectChanges();
        expect(JSON.stringify(fixture.componentInstance.groupPlayers)).toEqual(JSON.stringify({
            'Pending': [
                {
                    displayName: 'p3',
                    playerImage: 'http://thenetwork.com/url?33f.img',
                    playerProfile: 'http://www.com',
                    state: 'Pending'
                },
                {
                    displayName: 'me',
                    playerImage: undefined,
                    playerProfile: 'myprofile.pl',
                    state: 'Pending'
                }
            ],
            'Accepted': [
                {
                    displayName: 'p1',
                    playerImage: '/assets/avatars/maleprofile.png',
                    playerProfile: 'link1.html',
                    state: 'Accepted'
                },
            ],
            'Rejected': [
                {
                    displayName: 'p2',
                    playerImage: '/p2.img',
                    playerProfile: '/link2',
                    state: 'Rejected'
                },

            ],
            'Quit': []
        }));

        expect(fixture.componentInstance.showAccept).toBeTruthy();
        expect(fixture.componentInstance.showReject).toBeTruthy();
        expect(fixture.componentInstance.showRematch).toBeFalsy();
        expect(fixture.componentInstance.showQuit).toBeFalsy();
        expect(fixture.nativeElement.querySelectorAll('.btn-accept-game').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.btn-decline-game').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.btn-quit-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-rematch-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-end-rematch-game').length).toEqual(0);

        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Quit').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Accepted').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-group-item-player-Accepted').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Rejected').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-group-item-player-Rejected').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Pending').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-group-item-player-Pending').length).toEqual(2);

        expect(actionService.accept).not.toHaveBeenCalledWith(newGame);
        fixture.nativeElement.querySelector('.btn-accept-game').click();
        expect(actionService.accept).toHaveBeenCalledWith(newGame);
        expect(actionService.reject).not.toHaveBeenCalledWith(newGame);
        fixture.nativeElement.querySelector('.btn-decline-game').click();
        expect(actionService.reject).toHaveBeenCalledWith(newGame);

    });

    it('pending accept from other player', () => {
        const newGame = new TSBGame(baseGame);
        newGame.playerStates[playerMD5] = 'Accepted';
        gameService.testGameSubject.next(newGame);
        fixture.detectChanges();

        expect(fixture.componentInstance.showAccept).toBeFalsy();
        expect(fixture.componentInstance.showReject).toBeTruthy();
        expect(fixture.componentInstance.showRematch).toBeFalsy();
        expect(fixture.componentInstance.showQuit).toBeFalsy();
        expect(fixture.nativeElement.querySelectorAll('.btn-accept-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-decline-game').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.btn-quit-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-rematch-game').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.btn-end-rematch-game').length).toEqual(0);

        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Quit').length).toEqual(0);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Accepted').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-group-item-player-Accepted').length).toEqual(2);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Rejected').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-group-item-player-Rejected').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-players-group-Pending').length).toEqual(1);
        expect(fixture.nativeElement.querySelectorAll('.list-group-item-player-Pending').length).toEqual(1);

        expect(actionService.reject).not.toHaveBeenCalledWith(newGame);
        fixture.nativeElement.querySelector('.btn-decline-game').click();
        expect(actionService.reject).toHaveBeenCalledWith(newGame);

    });

    it('pending accept from player not in phase to accept', () => {
        const newGame = new TSBGame(baseGame);
        newGame.gamePhase = 'Nope';
        gameService.testGameSubject.next(newGame);
        fixture.detectChanges();

        expect(fixture.componentInstance.showAccept).toBeFalsy();
        expect(fixture.componentInstance.showReject).toBeFalsy();
        expect(fixture.componentInstance.showRematch).toBeFalsy();
        expect(fixture.componentInstance.showQuit).toBeFalsy();
        expect(fixture).toMatchSnapshot('round over version 1');
    });

    it('can quit in setup phase', () => {
        const newGame = new TSBGame(baseGame);
        newGame.gamePhase = 'Setup';
        gameService.testGameSubject.next(newGame);
        fixture.detectChanges();

        expect(fixture.componentInstance.showAccept).toBeFalsy();
        expect(fixture.componentInstance.showReject).toBeFalsy();
        expect(fixture.componentInstance.showRematch).toBeFalsy();
        expect(fixture.componentInstance.showQuit).toBeTruthy();
        expect(fixture).toMatchSnapshot('round over version 1');

        expect(actionService.reject).not.toHaveBeenCalledWith(newGame);
        fixture.nativeElement.querySelector('.btn-quit-game').click();
        expect(actionService.quit).toHaveBeenCalledWith(newGame);
    });

    it('can quit in playing phase', () => {
        const newGame = new TSBGame(baseGame);
        newGame.gamePhase = StandardPhases.Playing;
        gameService.testGameSubject.next(newGame);
        fixture.detectChanges();

        expect(fixture.componentInstance.showAccept).toBeFalsy();
        expect(fixture.componentInstance.showReject).toBeFalsy();
        expect(fixture.componentInstance.showRematch).toBeFalsy();
        expect(fixture.componentInstance.showQuit).toBeTruthy();
        expect(fixture).toMatchSnapshot('round over version 1');

        expect(actionService.reject).not.toHaveBeenCalledWith(newGame);
        fixture.nativeElement.querySelector('.btn-quit-game').click();
        expect(actionService.quit).toHaveBeenCalledWith(newGame);
    });

    it('can rematch or declined rematch in round over phase', () => {
        const newGame = new TSBGame(baseGame);
        newGame.gamePhase = StandardPhases.RoundOver;
        gameService.testGameSubject.next(newGame);
        fixture.detectChanges();

        expect(fixture.componentInstance.showAccept).toBeFalsy();
        expect(fixture.componentInstance.showReject).toBeFalsy();
        expect(fixture.componentInstance.showRematch).toBeTruthy();
        expect(fixture.componentInstance.showQuit).toBeFalsy();
        expect(fixture).toMatchSnapshot('round over version 1');

        expect(actionService.declineRematch).not.toHaveBeenCalledWith(newGame);
        fixture.nativeElement.querySelector('.btn-end-rematch-game').click();
        expect(actionService.declineRematch).toHaveBeenCalledWith(newGame);
        expect(actionService.rematch).not.toHaveBeenCalledWith(newGame);
        fixture.nativeElement.querySelector('.btn-rematch-game').click();
        expect(actionService.rematch).toHaveBeenCalledWith(newGame);
    });
});
