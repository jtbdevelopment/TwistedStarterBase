
export class Player {
    source: string;
    displayName: string;
    imageUrl: string;
    profileUrl: string;
    lastVersionNotes: string;
    adminUser: boolean = false;
    //  TODO
    //gameSpecificPlayerAttributes: Map<string, string> = new Map<string, string>();

    constructor(copyFrom?: Player) {
        if (copyFrom) {
            this.source = copyFrom.source;
            this.displayName = copyFrom.displayName;
            this.imageUrl = copyFrom.imageUrl;
            this.profileUrl = copyFrom.profileUrl;
            this.lastVersionNotes = copyFrom.lastVersionNotes;
            this.adminUser = copyFrom.adminUser;
        }
    }
}
