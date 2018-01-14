import {TestBed} from '@angular/core/testing';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DefaultErrorComponent} from './default-error.component';

class MockModal {
    dismiss = jasmine.createSpy('dismiss');
}

describe('Component:  default error component', () => {
    let fixture;
    let modal;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DefaultErrorComponent,
            ],
            providers: [
                {provide: NgbActiveModal, useClass: MockModal}
            ],
        });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(DefaultErrorComponent);
        modal = TestBed.get(NgbActiveModal);
        fixture.detectChanges();
    });

    it('displays error', () => {
        expect(fixture.nativeElement.querySelector('.error-message').textContent.trim()).toEqual('Something has gone wrong, going to try to re-login and reset.');
    });

    it('close modal', () => {
        expect(modal.dismiss).not.toHaveBeenCalled();
        fixture.nativeElement.querySelector('.close-button').click();
        expect(modal.dismiss).toHaveBeenCalled();
    });
});
