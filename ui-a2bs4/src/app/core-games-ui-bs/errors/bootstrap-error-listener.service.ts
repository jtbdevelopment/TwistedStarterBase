import {Injectable} from '@angular/core';
import {MessageBusService} from '../../core-games-ui/messagebus/message-bus.service';
import {DefaultErrorComponent} from './default-error.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class BootstrapErrorListenerService {
    public listenToSessionErrors: boolean = true;
    public listenToGeneralErrors: boolean = true;

    constructor(private messageBus: MessageBusService, private modalService: NgbModal) {
        this.messageBus.invalidSessionError.subscribe(() => {
            if (this.listenToSessionErrors) {
                modalService.open(DefaultErrorComponent);
            }
        });
        this.messageBus.generalError.subscribe(() => {
            if (this.listenToGeneralErrors) {
                modalService.open(DefaultErrorComponent);
            }
        });
    }

}