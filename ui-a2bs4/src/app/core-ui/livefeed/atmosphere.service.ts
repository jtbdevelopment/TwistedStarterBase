import {PlayerService} from '../player/player.service';
import {Player} from '../player/player.model';
import {Injectable} from '@angular/core';
import {AtmosphereRequest} from './atmosphererequest.model';
import * as atmosphere from 'atmosphere.js';
import {AtmosphereMessageProcessorService} from './atmospheremessageprocessor.service';

//  TODO - need to force creation of this service
@Injectable()
export class AtmosphereService {
    endPoint: string = '';

    //  TODO - public to aid in testing, global var blocked
    socket = atmosphere;

    private currentPlayerId: string;
    private currentConnection: any;

    constructor(private playerService: PlayerService, private messageHandler: AtmosphereMessageProcessorService) {
        playerService.player.subscribe(player => {
            this.startSocket(player);
        });
    }

    private closeSocket(): void {
        if (this.currentConnection) {
            try {
                this.currentConnection.close();
            } catch (error) {
                console.log('error closing existing live feed ' + JSON.stringify(error));
            }
            this.currentConnection = null;
        }
        this.currentPlayerId = null;
    }

    private startSocket(player: Player): void {
        if (player.id && player.id !== this.currentPlayerId) {
            this.closeSocket();

            let currentRequest: AtmosphereRequest = new AtmosphereRequest(this.endPoint, player.id);
            this.messageHandler.listen(currentRequest);
            try {
                this.currentConnection = this.socket.subscribe(currentRequest);
                this.currentPlayerId = player.id;
            } catch (error) {
                console.log('error with live feed ' + JSON.stringify(error));
            }
        }
    };
}

