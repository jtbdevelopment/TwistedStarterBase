import {Component} from '@angular/core';
import {Http} from '@angular/http';
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

    constructor(private http: Http) {
        this.times.forEach((time, index) => {
            this.http.get('/api/player/admin/playersCreated/' + time)
                .map(response => response.text())
                .subscribe(text => {
                        this.playersCreated[index] = Number(text);
                    },
                    error => {
                        //  TODO - general error handler
                        console.log(JSON.stringify(error));
                    }
                );
            this.http.get('/api/player/admin/playersLoggedIn/' + time)
                .map(response => response.text())
                .subscribe(text => {
                        this.playerLogins[index] = Number(text);
                    },
                    error => {
                        //  TODO - general error handler
                        console.log(JSON.stringify(error));
                    }
                );
            this.http.get('/api/player/admin/gamesSince/' + time)
                .map(response => response.text())
                .subscribe(text => {
                        this.gamesCreated[index] = Number(text);
                    },
                    error => {
                        //  TODO - general error handler
                        console.log(JSON.stringify(error));
                    }
                );
            this.http.get('/api/player/admin/gameCount')
                .map(response => response.text())
                .subscribe(text => {
                        this.gameCount = Number(text);
                    },
                    error => {
                        //  TODO - general error handler
                        console.log(JSON.stringify(error));
                    }
                );
            this.http.get('/api/player/admin/playerCount')
                .map(response => response.text())
                .subscribe(text => {
                        this.playerCount = Number(text);
                    },
                    error => {
                        //  TODO - general error handler
                        console.log(JSON.stringify(error));
                    }
                );
        });
    }
}
