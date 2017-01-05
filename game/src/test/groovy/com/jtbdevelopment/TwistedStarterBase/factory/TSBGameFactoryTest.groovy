package com.jtbdevelopment.TwistedStarterBase.factory

import com.jtbdevelopment.TwistedStarterBase.state.TSBGame

/**
 * Date: 7/13/16
 * Time: 9:32 PM
 */
class TSBGameFactoryTest extends GroovyTestCase {
    TSBGameFactory factory = new TSBGameFactory()

    void testCreatesNewGame() {
        TSBGame game1 = factory.newGame()
        TSBGame game2 = factory.newGame()

        assertNotNull game1
        assertNotNull game2
        assertFalse game1.is(game2)
    }
}
