import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {MessageBusService} from '../messagebus/message-bus.service';
import {Feature} from './feature.model';
import {FeatureOption} from './feature-option.model';
import any = jasmine.any;

@Injectable()
export class FeatureCacheService {
    public features: Observable<Feature[]>;

    private featuresSubject: BehaviorSubject<Feature[]> = new BehaviorSubject<Feature[]>([]);

    constructor(private http: Http, private messageBus: MessageBusService) {
        this.features = Observable.from(this.featuresSubject);
        this.messageBus.connectionStatus.subscribe(connected => {
            if (connected && this.featuresSubject.getValue().length === 0) {
                this.initialize();
            }
        });
    }

    private initialize(): void {
        this.http.get('/api/features')
            .map(response => response.json())
            .map(json => {
                let features = [];
                json.forEach(feature => {
                    let newFeature = new Feature(feature.feature.feature, feature.feature.groupType, feature.feature.label, feature.feature.description);
                    feature.options.forEach(option => {
                        //noinspection TypeScriptUnresolvedVariable
                        let newOption = new FeatureOption(option.feature, option.label, option.description);
                        newFeature.options.push(newOption);
                    });
                    features.push(newFeature);
                });
                return features;
            })
            .subscribe(features => {
                this.featuresSubject.next(features);
            }, error => {
                //  TODO - general error handler
                console.log(JSON.stringify(error));
            });
    }
}
