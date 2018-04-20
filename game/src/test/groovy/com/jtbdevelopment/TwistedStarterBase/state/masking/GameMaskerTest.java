package com.jtbdevelopment.TwistedStarterBase.state.masking;

import groovy.util.GroovyTestCase;
import junit.framework.TestCase;
import org.bson.types.ObjectId;
import org.junit.Test;

/**
 * Date: 7/13/16
 * Time: 7:09 PM
 */
public class GameMaskerTest extends GroovyTestCase {
    private GameMasker masker = new GameMasker();

    @Test
    public void testNewMaskedGame() {
        TSBMaskedGame game = masker.newMaskedGame();
        TestCase.assertNotNull(game);
    }

    @Test
    public void testGetIDClass() {
        GroovyTestCase.assertEquals(ObjectId.class, masker.getIDClass());
    }
}
