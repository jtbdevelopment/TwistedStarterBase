import {IGameClassifier} from './igameclassifier.service';
import {Observable, BehaviorSubject} from 'rxjs';
import {Game} from '../games/game.model';
import {Injectable} from '@angular/core';
import {PhaseCache} from '../phases/phasecache.service';

@Injectable()
export class PhaseGameClassifier implements IGameClassifier {
    private phaseToGroup: Map<string, string> = new Map<string, string>();
    private phasesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

    constructor(private phaseCache: PhaseCache) {
        this.phaseCache.phases.subscribe(phases => {
            if (phases) {
                this.phaseToGroup.clear();
                let groups = [];
                phases.forEach(phase => {
                    groups.push(phase.groupLabel);
                    this.phaseToGroup.set(phase.value, phase.groupLabel);
                });
                this.phasesSubject.next(groups);
            }
        });
    }

    public getClassifications(): Observable<string[]> {
        return Observable.from(this.phasesSubject);
    }

    public classifyGame(game: Game): string {
        if (this.phaseToGroup.has(game.gamePhase)) {
            return this.phaseToGroup.get(game.gamePhase);
        }
        return game.gamePhase;
    };
}
