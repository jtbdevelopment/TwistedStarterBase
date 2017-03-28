import {Player} from './player.model';
describe('Model: player', () => {
    it('defaults to undefined player with no admin rights', () => {
        let p: Player = new Player();

        expect(p.displayName).toBeUndefined();
        expect(p.adminUser).toBeFalsy();
        expect(p.imageUrl).toBeUndefined();
        expect(p.profileUrl).toBeUndefined();
        expect(p.source).toBeUndefined();
        expect(p.lastVersionNotes).toBeUndefined();
    });

    it('copies from optional param if provided', () => {
        let source: Player = new Player();
        source.imageUrl = 'imageurl';
        source.profileUrl = 'profileUrl';
        source.adminUser = true;
        source.displayName = 'disname';
        source.lastVersionNotes = 'lvn';
        source.source = 's';
        let p: Player = new Player(source);

        expect(p.imageUrl).toEqual(source.imageUrl);
        expect(p.profileUrl).toEqual(source.profileUrl);
        expect(p.adminUser).toEqual(source.adminUser);
        expect(p.displayName).toEqual(source.displayName);
        expect(p.lastVersionNotes).toEqual(source.lastVersionNotes);
        expect(p.source).toEqual(source.source);
    });
});
