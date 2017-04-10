import {Player} from '../player/player.model';
import {MessageBusService} from '../messagebus/messagebus.service';
import {Injectable, Inject} from '@angular/core';
import {Subscription} from 'rxjs';
import {IAtmosphereRequest} from './atmosphererequest.model';
import {IGameFactory} from '../games/igamefactory.service';

@Injectable()
export class AtmosphereMessageProcessorService {
    private statusSubscription: Subscription;
    private messageSubscription: Subscription;

    constructor(private messageBus: MessageBusService, @Inject('GameFactory') private gameFactory: IGameFactory) {
    }

    listen(request: IAtmosphereRequest) {
        this.close();
        this.messageSubscription = request.messageSubject.subscribe(message => this.processMessage(message));
        this.statusSubscription = request.requestConnectionStatus.subscribe(status => this.messageBus.connectionStatus.next(status));
    }

    private close() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
            this.messageSubscription = null;
        }
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
            this.statusSubscription = null;
        }
        this.messageBus.connectionStatus.next(false);
    }

    private processMessage(message: any): void {
        if (message.messageType) {
            switch (message.messageType as string) {
                case 'Game':
                    this.messageBus.gameUpdates.next(this.gameFactory.newGame(message.game));
                    break;
                case 'Player':
                    this.messageBus.playerUpdates.next(new Player(message.player as Player));
                    break;
                case 'Heartbeat':
                    console.log('got a heartbeat ' + JSON.stringify(message.message));
                    break;
                default:
                    console.warn('onMessage: unknown message type ' + JSON.stringify(message));
                    break;
            }
        }
    }
}
