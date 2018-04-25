package com.jtbdevelopment.TwistedStarterBase.factory;

import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import org.junit.Test;

import java.util.Collections;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotSame;

/**
 * Date: 7/13/16
 * Time: 9:32 PM
 */
public class TSBGameFactoryTest {
    private TSBGameFactory factory = new TSBGameFactory(Collections.emptyList(), Collections.emptyList());

    @Test
    public void testCreatesNewGame() {
        TSBGame game1 = factory.newGame();
        TSBGame game2 = factory.newGame();

        assertNotNull(game1);
        assertNotNull(game2);
        assertNotSame(game1, game2);
    }
}
