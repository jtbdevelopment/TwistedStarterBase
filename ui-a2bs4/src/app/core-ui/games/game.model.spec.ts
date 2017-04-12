import {Game} from './game.model';
describe('Model: Game', () => {
    it('defaults to undefined', () => {
        let g: Game = new Game();

        expect(g.id).toBeUndefined();
        expect(g.previousId).toBeUndefined();
        expect(g.version).toBeUndefined();
        expect(g.round).toBeUndefined();
        expect(g.created).toBeUndefined();
        expect(g.lastUpdate).toBeUndefined();
        expect(g.completedTimestamp).toBeUndefined();
        expect(g.gamePhase).toBeUndefined();
        expect(JSON.stringify(g.features)).toEqual(JSON.stringify([]));
        expect(JSON.stringify(g.players)).toEqual(JSON.stringify([]));
        expect(JSON.stringify(g.playerProfiles)).toEqual(JSON.stringify([]));
        expect(JSON.stringify(g.playerImages)).toEqual(JSON.stringify([]));
    });

    it('copies from optional param if provided', () => {
        let source: Game = new Game();
        source.id = 'id1';
        source.previousId = 'pid';
        source.version = 3;
        source.round = 4;
        source.created = 123455;
        source.lastUpdate = source.created + 100;
        source.completedTimestamp = source.lastUpdate + 200;
        source.gamePhase = 'aphase';
        source.players.set('md51', 'p1');
        source.players.set('md52', 'p2');
        source.playerImages.set('md52', 'imageurl2');
        source.playerImages.set('md51', 'imageurl1');
        source.playerProfiles.set('md52', 'profile2');
        source.playerProfiles.set('md51', 'profile1');
        source.features = ['F1', 'F3', 'F2'];
        let g: Game = new Game(source);

        expect(g.id).toEqual(source.id);
        expect(g.previousId).toEqual(source.previousId);
        expect(g.version).toBeCloseTo(source.version);
        expect(g.round).toBeCloseTo(source.round);
        expect(g.created).toBeCloseTo(source.created);
        expect(g.lastUpdate).toBeCloseTo(source.lastUpdate);
        expect(g.completedTimestamp).toBeCloseTo(source.completedTimestamp);
        expect(g.gamePhase).toEqual(source.gamePhase);
        expect(JSON.stringify(g.features)).toEqual(JSON.stringify(source.features));
        expect(JSON.stringify(g.players)).toEqual(JSON.stringify(source.players));
        expect(JSON.stringify(g.playerProfiles)).toEqual(JSON.stringify(source.playerProfiles));
        expect(JSON.stringify(g.playerImages)).toEqual(JSON.stringify(source.playerImages));
    });
});
