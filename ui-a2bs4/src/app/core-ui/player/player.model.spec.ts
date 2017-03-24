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
});
