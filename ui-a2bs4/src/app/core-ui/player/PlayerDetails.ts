
export class GameTracker {
    freeGamesUsedToday: number;
    availablePurchasedGames: number;
    maxDailyFreeGames: number;
}

export class PlayerDetails {
    source: string;
    displayName: string;
    imageUrl: string;
    profileUrl: string;
    lastVersionNotes: string;
    adminUser: string;
    gameSpecificPlayerAttributes: GameTracker;
}