import {Injectable} from '@angular/core';
import {MessageBusService} from 'jtb-core-games-ui';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {from} from 'rxjs/observable/from';

@Injectable()
export class GameMenuService {
  public showGames: Observable<boolean>;

  private showGamesSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private messageBus: MessageBusService) {
    this.showGames = from<boolean>(this.showGamesSubject);
    this.messageBus.connectionStatus.subscribe(connected => {
      this.showGamesSubject.next(connected);
    });
  }

  setShowGames(show: boolean): void {
    this.showGamesSubject.next(show);
  }

  getShowGames(): boolean {
    return this.showGamesSubject.getValue();
  }
}
