import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    template: require('./default-error.component.html')
})
export class DefaultErrorComponent {
    constructor(public activeModal: NgbActiveModal) {
    }

}