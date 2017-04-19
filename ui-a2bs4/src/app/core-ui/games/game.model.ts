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

    constructor(original?: any) {
        Object.assign(this, original);
    }

    public standardLink(): string {
        return '#/game/' + this.gamePhase.toLowerCase() + '/' + this.id;
    }
}
