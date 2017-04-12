import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {MessageBusService} from '../messagebus/messagebus.service';
import {Observable, BehaviorSubject} from 'rxjs';
import {Phase} from './phase.model';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import any = jasmine.any;

@Injectable()
export class PhaseCache {
    public phases: Observable<Phase[]>;

    private phasesSubject: BehaviorSubject<Phase[]> = new BehaviorSubject<Phase[]>(null);

    constructor(private http: Http, private messageBus: MessageBusService) {
        this.phases = Observable.from(this.phasesSubject);
        this.messageBus.connectionStatus.subscribe(connected => {
            if (connected && !this.phasesSubject.getValue()) {
                this.initializePhases();
            }
        });
    }

    private initializePhases(): void {
        this.http.get('/api/phases')
            .map(response => response.json())
            .map(json => {
                let phases = [];
                Object.getOwnPropertyNames(json).forEach(phase => {
                    phases.push(new Phase(phase, json[phase][1], json[phase][0]));
                });
                return phases;
            })
            .subscribe(phases => {
                this.phasesSubject.next(phases);
            }, error => {
                //  TODO - general error handler
                console.log(JSON.stringify(error));
            });
    }
}
