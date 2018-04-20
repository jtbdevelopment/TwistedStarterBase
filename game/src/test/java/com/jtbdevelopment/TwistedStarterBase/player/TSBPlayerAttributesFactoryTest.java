package com.jtbdevelopment.TwistedStarterBase.player;

import org.junit.Assert;
import org.junit.Test;

/**
 * Date: 7/27/16
 * Time: 6:39 PM
 */
public class TSBPlayerAttributesFactoryTest {
    private TSBPlayerAttributesFactory factory = new TSBPlayerAttributesFactory();

    @Test
    public void testNewPlayerAttributes() {
        Assert.assertTrue(factory.newPlayerAttributes() instanceof TSBPlayerAttributes);
    }

    @Test
    public void testNewManualPlayerAttributes() {
        Assert.assertTrue(factory.newManualPlayerAttributes() instanceof TSBPlayerAttributes);
    }

    @Test
    public void testNewSystemPlayerAttributes() {
        Assert.assertNull(factory.newSystemPlayerAttributes());
    }
}
