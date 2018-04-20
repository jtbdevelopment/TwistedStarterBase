package com.jtbdevelopment.TwistedStarterBase.player;

import com.jtbdevelopment.games.mongo.MongoGameCoreTestCase;
import com.jtbdevelopment.games.mongo.players.MongoPlayer;
import com.jtbdevelopment.games.players.PlayerPayLevel;
import org.bson.types.ObjectId;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Date: 7/27/16
 * Time: 6:41 PM
 */
public class TSBPlayerAttributesTest extends MongoGameCoreTestCase {
    @Test
    public void testFreeToPlayPlayer() {
        MongoPlayer player = MongoGameCoreTestCase.makeSimplePlayer(new ObjectId().toHexString());
        player.setPayLevel(PlayerPayLevel.FreeToPlay);

        TSBPlayerAttributes attributes = new TSBPlayerAttributes();
        attributes.setPlayer(player);
        assertEquals(50, attributes.getMaxDailyFreeGames());
    }

    @Test
    public void testPremiumPlayer() {
        MongoPlayer player = MongoGameCoreTestCase.makeSimplePlayer(new ObjectId().toHexString());
        player.setPayLevel(PlayerPayLevel.PremiumPlayer);

        TSBPlayerAttributes attributes = new TSBPlayerAttributes();
        attributes.setPlayer(player);
        assertEquals(100, attributes.getMaxDailyFreeGames());
    }

}
