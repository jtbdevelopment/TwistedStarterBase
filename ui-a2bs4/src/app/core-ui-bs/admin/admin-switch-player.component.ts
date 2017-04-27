import {Component} from '@angular/core';
import {Player} from '../../core-ui/player/player.model';
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
    public currentPage: number = 0;

    public revertToNormal(): void {

    }

    public refreshUsers(): void {

    }

    public switchToPlayer(id: string): void {

    }

    public changePage(): void {

    }
}
