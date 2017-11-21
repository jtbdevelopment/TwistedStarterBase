import {async, TestBed} from '@angular/core/testing';
import {AppConfig} from '../../core-games-ui/appconfig.interface';
import {DefaultVersionNotesComponent} from './default-version-notes.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


let releaseNotes: string = 'We made some changes!';

class MockAppConfig implements AppConfig {
    appName: string = '';
    hoverMenu: boolean = false;
    releaseNotes: string = releaseNotes;
    version: string = '';
}

class MockModal {
    dismiss = jasmine.createSpy('dismiss');
}

describe('Component:  default version notes component', () => {
    let fixture;
    let modal;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DefaultVersionNotesComponent,
            ],
            providers: [
                {provide: 'AppConfig', useClass: MockAppConfig},
                {provide: NgbActiveModal, useClass: MockModal}
            ],
        });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(DefaultVersionNotesComponent);
        modal = TestBed.get(NgbActiveModal);
        fixture.detectChanges();
    }));

    it('displays release notes', () => {
        expect(fixture.nativeElement.querySelector('.version-message').textContent.trim()).toEqual(releaseNotes);
    });

    it('close modal', () => {
        expect(modal.dismiss).not.toHaveBeenCalled();
        fixture.nativeElement.querySelector('.close-button').click();
        expect(modal.dismiss).toHaveBeenCalled();
    });
});
