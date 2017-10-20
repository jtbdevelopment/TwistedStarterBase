import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NgbModule, NgbTabsetConfig, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {CreateGameComponent} from './create-game.component';
import {FormsModule} from '@angular/forms';
import {FeatureGroup} from '../core-ui/features/feature-group.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FeatureCacheService} from '../core-ui/features/feature-cache.service';
import {Feature} from '../core-ui/features/feature.model';
import {FeatureOption} from '../core-ui/features/feature-option.model';

class MockFeatureService {
    public features: BehaviorSubject<FeatureGroup[]> = new BehaviorSubject<FeatureGroup[]>([]);
}

describe('Component:  create game component', () => {
    var featureService: MockFeatureService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                FormsModule
            ],
            declarations: [
                CreateGameComponent
            ],
            providers: [
                {provide: FeatureCacheService, useClass: MockFeatureService},
                NgbTabsetConfig,
                NgbTooltipConfig
            ]
        });
        TestBed.compileComponents();
        featureService = TestBed.get(FeatureCacheService);

    }));

    it('initializes', () => {
        const fixture = TestBed.createComponent(CreateGameComponent);

        fixture.detectChanges();
        let empty = {};
        expect(fixture.componentInstance.choices).toEqual(empty);
        expect(fixture.componentInstance.groups).toEqual([]);
    });

    it('subscribes to game features', fakeAsync(() => {
        const fixture = TestBed.createComponent(CreateGameComponent);

        let groups: FeatureGroup[] = [
            new FeatureGroup('Group1'),
            new FeatureGroup('Group2')
        ];
        groups[0].features = [
            new Feature('feature1', 'feature 1', 'feature 1 desc'),
            new Feature('feature2', 'feature 2', 'feature 2 desc'),
        ];
        groups[1].features = [
            new Feature('feature3', 'feature 3', 'feature 3 desc'),
        ];
        groups[0].features[0].options = [
            new FeatureOption('option1-1', 'option 1-1', 'option 1-1 desc'),
            new FeatureOption('option1-2', 'option 1-2', 'option 1-2 desc'),
            new FeatureOption('option1-3', 'option 1-3', 'option 1-3 desc'),
        ];
        groups[0].features[1].options = [
            new FeatureOption('option2-1', 'option 2-1', 'option 2-1 desc'),
            new FeatureOption('option2-2', 'option 2-2', 'option 2-2 desc'),
        ];
        groups[1].features[0].options = [
            new FeatureOption('option3-1', 'option 3-1', 'option 3-1 desc'),
            new FeatureOption('option3-2', 'option 3-2', 'option 3-2 desc'),
            new FeatureOption('option3-3', 'option 3-3', 'option 3-3 desc'),
            new FeatureOption('option4-3', 'option 4-3', 'option 4-3 desc'),
        ];
        featureService.features.next(groups);
        tick();
        fixture.detectChanges();

        expect(fixture.componentInstance.groups).toEqual(groups);
        expect(JSON.stringify(fixture.componentInstance.choices)).toEqual(JSON.stringify(
            {
                feature1: 'option1-1',
                feature2: 'option2-1',
                feature3: 'option3-1',
            }
        ));


        groups.forEach(group => {
            let tab = fixture.nativeElement.querySelector('#' + group.groupType);
            expect(tab).toBeDefined();
        });
    }));

});