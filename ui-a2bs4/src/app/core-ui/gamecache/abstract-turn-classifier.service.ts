import {Observable, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class AbstractTurnClassifier {
    //noinspection JSMethodCanBeStatic
    public getClassifications(): Observable<string[]> {
        return new BehaviorSubject(['Your Turn', 'Their Turn', 'Older Games']);
    }

    //  Game buckets to icons - can return empty map if not initialized
    //noinspection JSMethodCanBeStatic
    public getIcons(): Observable<Map<string, string>> {
        return new BehaviorSubject(
            new Map<string, string>(
                [
                    ['Your Turn', 'play'],
                    ['Their Turn', 'pause'],
                    ['Older Games', 'stop']
                ] as [string, string][]
            )
        );
    }
}
