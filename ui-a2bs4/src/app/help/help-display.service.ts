import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';

@Injectable()
export class HelpDisplayService {
    public showHelp: Observable<boolean>;
    private showHelpSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.showHelp = Observable.from(this.showHelpSubject);
    }

    public toggleHelp(): void {
        this.showHelpSubject.next(!this.showHelpSubject.value);
    }
}
