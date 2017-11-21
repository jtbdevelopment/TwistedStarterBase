import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PlayerService} from '../../core-games-ui/player/player.service';
import {AppConfig} from '../../core-games-ui/appconfig.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DefaultVersionNotesComponent} from './default-version-notes.component';

@Injectable()
export class VersionService {
    private modalComponent: any = DefaultVersionNotesComponent;

    constructor(@Inject('AppConfig') private config: AppConfig,
                private http: Http,
                private playerService: PlayerService,
                private modalService: NgbModal) {
        this.playerService.loggedInPlayer.subscribe(p => {
            this.displayVersionNotes(p.lastVersionNotes);
        });
    }

    /**
     * Component should take in AppConfig and use version notes
     * @param modalComponent
     */
    public setVersionNotesComponent(modalComponent: any) {
        this.modalComponent = modalComponent;
    }

    private displayVersionNotes(lastVersionForPlayer: string): void {
        let display = this.playerNeedsToSeeNotes(lastVersionForPlayer);
        if (display) {
            this.modalService.open(this.modalComponent);
            this.http.post('/api/player/lastVersionNotes/' + this.config.version, '')
                .subscribe(response => {
                    console.log('updated player version. ' + response.status);
                }, error => {
                    console.log('error updating player version' + JSON.stringify(error));
                });
        }
    }

    private playerNeedsToSeeNotes(lastVersionForPlayer: string) {
        let display: boolean = false;
        if (lastVersionForPlayer !== undefined) {
            let currentParts: string[] = this.config.version.split('.');
            let playerParts: string[] = lastVersionForPlayer.split('.');
            if (currentParts.length !== playerParts.length) {
                display = true;
            }
            if (display === false) {
                currentParts.forEach((v, index) => {
                    if (parseInt(v, 10) > parseInt(playerParts[index], 10)) {
                        display = true;
                    }
                });
            }
        }
        return display;
    }
}
