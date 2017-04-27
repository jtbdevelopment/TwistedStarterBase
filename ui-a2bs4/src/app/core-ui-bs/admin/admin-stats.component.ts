import {Component} from '@angular/core';
@Component({
    selector: 'admin-stats',
    template: require('./admin-stats.component.html'),
})
export class AdminStatsComponent {
    private static dayInSeconds: number = 86400;

    public playerCount: number = 0;
    public gameCount: number = 0;
    public gamesCreated: number[] = [0, 0, 0];
    public playersCreated: number[] = [0, 0, 0];
    public playerLogins: number[] = [0, 0, 0];

    private time: number = Math.floor((new Date()).getTime() / 1000);
    private times: number[] = [
        (this.time - AdminStatsComponent.dayInSeconds),
        (this.time - (AdminStatsComponent.dayInSeconds * 7)),
        (this.time - (AdminStatsComponent.dayInSeconds * 30))
    ];
}
