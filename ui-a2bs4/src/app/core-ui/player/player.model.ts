
export class Player {
    id: string;
    md5: string;
    source: string;
    displayName: string;
    imageUrl: string;
    profileUrl: string;
    lastVersionNotes: string;
    adminUser: boolean = false;
    gameSpecificPlayerAttributes: any = {};

    constructor(copyFrom?: Player) {
        if (copyFrom) {
            this.id = copyFrom.id;
            this.md5 = copyFrom.md5;
            this.source = copyFrom.source;
            this.displayName = copyFrom.displayName;
            this.imageUrl = copyFrom.imageUrl;
            this.profileUrl = copyFrom.profileUrl;
            this.lastVersionNotes = copyFrom.lastVersionNotes;
            this.adminUser = copyFrom.adminUser;
            this.gameSpecificPlayerAttributes = Object.assign({}, copyFrom.gameSpecificPlayerAttributes);
        }
    }
}
