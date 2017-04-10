import {SinglePlayerGame} from './singleplayergame.model';
describe('Model: Game', () => {
    it('defaults to undefined', () => {
        let g: SinglePlayerGame = new SinglePlayerGame();

        //  select checks from underlying game class
        expect(g.id).toBeUndefined();
        expect(g.version).toBeUndefined();
        expect(g.created).toBeUndefined();
        expect(JSON.stringify(g.players)).toEqual(JSON.stringify([]));

        //  SPG specific checks - none for now
    });

    it('copies from optional param if provided', () => {
        let source: SinglePlayerGame = new SinglePlayerGame();
        source.id = 'id1';
        source.version = 34;
        source.created = 123455;
        source.players.set('md51', 'p1');
        source.players.set('md52', 'p2');
        let g: SinglePlayerGame = new SinglePlayerGame(source);

        //  select checks from underlying game class
        expect(g.id).toEqual(source.id);
        expect(g.version).toBeCloseTo(source.version);
        expect(g.created).toBeCloseTo(source.created);
        expect(JSON.stringify(g.players)).toEqual(JSON.stringify(source.players));

        //  SPG specific checks - none for now
    });
});
