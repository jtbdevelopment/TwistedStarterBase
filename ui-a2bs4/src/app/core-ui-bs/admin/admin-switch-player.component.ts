import {Component} from '@angular/core';
@Component({
    selector: 'admin-switch-player',
    template: require('./admin-switch-player.component.html'),
})
export class AdminSwitchPlayerComponent {
    private static dayInSeconds: number = 86400;

    public playerCount: number = 0;
    public gameCount: number = 0;
    public gamesCreated: number[] = [0, 0, 0];
    public playersCreated: number[] = [0, 0, 0];
    public playerLogins: number[] = [0, 0, 0];

    private time: number = Math.floor((new Date()).getTime() / 1000);
    private times: number[] = [
        (this.time - AdminSwitchPlayerComponent.dayInSeconds),
        (this.time - (AdminSwitchPlayerComponent.dayInSeconds * 7)),
        (this.time - (AdminSwitchPlayerComponent.dayInSeconds * 30))
    ];
}
