import {Injectable} from '@angular/core';
import {Player} from '../player/player.model';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable()
export class MessageBusService {
    connectionStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    playerUpdates: Subject<Player> = new Subject<Player>();
}
