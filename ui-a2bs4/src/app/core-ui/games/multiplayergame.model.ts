import {Game} from './game.model';

export class MultiPlayerGame extends Game {
    public maskedForPlayerID: string;
    public maskedForPlayerMD5: string;

    public declinedTimestamp: number;
    public rematchTimestamp: number;

    public initiatingPlayer: string;
    public playerStates: Map<string, string> = new Map<string, string>();  // md5 to state

    constructor(original?: MultiPlayerGame) {
        super(original);
        if (original) {
            this.maskedForPlayerID = original.maskedForPlayerID;
            this.maskedForPlayerMD5 = original.maskedForPlayerMD5;
            this.declinedTimestamp = original.declinedTimestamp;
            this.rematchTimestamp = original.rematchTimestamp;
            this.initiatingPlayer = original.initiatingPlayer;
            original.playerStates.forEach((v, k) => {
                this.playerStates.set(k, v);
            });
        }
    }
}
