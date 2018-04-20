package com.jtbdevelopment.TwistedStarterBase.factory;

import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import org.codehaus.groovy.runtime.DefaultGroovyMethods;
import org.junit.Assert;
import org.junit.Test;

import java.util.Collections;

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

        Assert.assertNotNull(game1);
        Assert.assertNotNull(game2);
        Assert.assertFalse(DefaultGroovyMethods.is(game1, game2));
    }
}
