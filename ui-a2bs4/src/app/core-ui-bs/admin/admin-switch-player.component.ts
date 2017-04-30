import {Component} from '@angular/core';
import {Player} from '../../core-ui/player/player.model';
import {PlayerService} from '../../core-ui/player/player.service';
import {Http} from '@angular/http';
@Component({
    selector: 'admin-switch-player',
    template: require('./admin-switch-player.component.html'),
})
export class AdminSwitchPlayerComponent {
    public revertText: string = '';
    public revertEnabled: boolean = false;
    public searchText: string = '';
    public players: Player[] = [];

    public pageSize: number = 20;
    public totalPlayers: number = 0;
    public currentPage: number = 1;

    private player: Player;
    private loggedInPlayer: Player;

    constructor(private playerService: PlayerService, private http: Http) {
        this.playerService.player.subscribe(p => {
            this.player = p;
            this.computeRevert();
        });
        this.playerService.loggedInPlayer.subscribe(p => {
            this.loggedInPlayer = p;
            this.computeRevert();
        });
        this.refreshUsers();
    }

    public switchToPlayer(id: string): void {
        this.playerService.simulateUser(id);
    }

    public revertToNormal(): void {
        this.playerService.simulateUser(this.loggedInPlayer.id);
    }

    public refreshUsers(): void {
        let pageParams = '?pageSize=' + this.pageSize +
            '&page=' + (this.currentPage - 1) +
            //  TODO - encode
            '&like=' + this.searchText;
        this.http.get('/api/player/admin/playersLike/' + pageParams)
            .map(response => response.json())
            .subscribe(json => {
                    this.totalPlayers = json.totalElements;
                    // controller.numberOfPages = response.totalPages;
                    let newPlayers = [];
                    json.content.forEach(p => {
                        newPlayers.push(new Player(p));
                    });
                    this.players = newPlayers;
                    this.currentPage = json.number + 1;
                }
            );
    }

    public changePage(): void {
        this.refreshUsers();
    }

    private computeRevert(): void {
        this.revertEnabled = (this.player && this.loggedInPlayer && this.player.id !== this.loggedInPlayer.id);
        this.revertText = this.revertEnabled ?
            'You are simulating another player.' :
            'You are yourself.';
    }
}
