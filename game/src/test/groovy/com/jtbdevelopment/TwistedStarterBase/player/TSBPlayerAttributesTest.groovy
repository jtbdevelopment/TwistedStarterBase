package com.jtbdevelopment.TwistedStarterBase.player

import com.jtbdevelopment.games.mongo.MongoGameCoreTestCase
import com.jtbdevelopment.games.mongo.players.MongoPlayer
import com.jtbdevelopment.games.players.PlayerPayLevel
import org.bson.types.ObjectId
import org.junit.Test

/**
 * Date: 7/27/16
 * Time: 6:41 PM
 */
class TSBPlayerAttributesTest extends MongoGameCoreTestCase {
    @Test
    void testFreeToPlayPlayer() {
        MongoPlayer player = makeSimplePlayer(new ObjectId().toHexString())
        player.payLevel = PlayerPayLevel.FreeToPlay

        def attributes = new TSBPlayerAttributes()
        attributes.setPlayer(player)
        assertEquals(50, attributes.maxDailyFreeGames)
    }

    @Test
    void testPremiumPlayer() {
        MongoPlayer player = makeSimplePlayer(new ObjectId().toHexString())
        player.payLevel = PlayerPayLevel.PremiumPlayer

        def attributes = new TSBPlayerAttributes()
        attributes.setPlayer(player)
        assertEquals(100, attributes.maxDailyFreeGames)
    }
}
