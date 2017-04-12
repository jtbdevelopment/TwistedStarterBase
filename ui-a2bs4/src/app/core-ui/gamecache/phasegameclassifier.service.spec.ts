import {ReflectiveInjector} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {Phase} from '../phases/phase.model';
import {fakeAsync, tick} from '@angular/core/testing';
import {Game} from '../games/game.model';
import {PhaseCache} from '../phases/phasecache.service';
import {PhaseGameClassifier} from './phasegameclassifier.service';

class MockPhaseService {
    public phasesSubject: BehaviorSubject<Phase[]> = new BehaviorSubject<Phase[]>(null);
    public phases: Observable<Phase[]> = Observable.from(this.phasesSubject);
}

describe('Service: phase game clasifier service', () => {
    let phaseCache: MockPhaseService;
    let classifier: PhaseGameClassifier;
    let classifications: string[];

    beforeEach(() => {
        classifications = null;
        this.injector = ReflectiveInjector.resolveAndCreate([
                {provide: PhaseCache, useClass: MockPhaseService},
                PhaseGameClassifier
            ]
        );
        phaseCache = this.injector.get(PhaseCache);
        classifier = this.injector.get(PhaseGameClassifier);
        classifier.getClassifications().subscribe(c => classifications = c);
    });

    it('before initialization of phases, returns game phase', fakeAsync(() => {
        let g = new Game();
        g.gamePhase = 'phase1';

        expect(classifier.classifyGame(g)).toEqual(g.gamePhase);
        expect(classifications).toBeNull();
    }));

    describe('after phases initialized', () => {
        let p1 = new Phase('phase1', 'Phase 1', 'Phase 1 Desc');
        let p2 = new Phase('phase2', 'Phase 2', 'Phase 2 Desc');
        beforeEach(fakeAsync(() => {
            phaseCache.phasesSubject.next([p1, p2]);
            tick();
        }));

        it('classifications are initialized', () => {
            expect(classifications).toEqual(['Phase 1', 'Phase 2']);
        });

        it('returns Phase 1 for phase1 game', () => {
            let g = new Game();
            g.gamePhase = 'phase1';

            expect(classifier.classifyGame(g)).toEqual(p1.groupLabel);
        });

        it('returns Phase 2 for phase2 game', () => {
            let g = new Game();
            g.gamePhase = 'phase2';

            expect(classifier.classifyGame(g)).toEqual(p2.groupLabel);
        });

        it('returns raw phase for unknown pahse', () => {
            let g = new Game();
            g.gamePhase = 'unknown';

            expect(classifier.classifyGame(g)).toEqual(g.gamePhase);
        });
    });
});
