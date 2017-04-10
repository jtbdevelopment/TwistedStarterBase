export class Game {
    public id: string;
    public previousId: string;
    public version: number;

    public round: number;

    public created: number;
    public lastUpdate: number;
    public completedTimestamp: number;

    public gamePhase: string;

    public players: Map<string, string> = new Map<string, string>();  // md5 to name
    public playerImages: Map<string, string> = new Map<string, string>(); // md5 to image
    public playerProfiles: Map<string, string> = new Map<string, string>();  // md5 to profile

    public features: string[] = [];

    constructor(original?: Game) {
        if (original) {
            this.id = original.id;
            this.previousId = original.previousId;
            this.version = original.version;
            this.round = original.round;
            this.created = original.created;
            this.lastUpdate = original.lastUpdate;
            this.completedTimestamp = original.completedTimestamp;
            this.gamePhase = original.gamePhase;
            original.players.forEach((v, k) => {
                this.players.set(k, v);
            });
            original.playerImages.forEach((v, k) => {
                this.playerImages.set(k, v);
            });
            original.playerProfiles.forEach((v, k) => {
                this.playerProfiles.set(k, v);
            });
            Object.assign(this.features, original.features);
        }
    }
}
