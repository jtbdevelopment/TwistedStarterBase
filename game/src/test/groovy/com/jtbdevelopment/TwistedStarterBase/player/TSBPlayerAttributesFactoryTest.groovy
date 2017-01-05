package com.jtbdevelopment.TwistedStarterBase.player

/**
 * Date: 7/27/16
 * Time: 6:39 PM
 */
class TSBPlayerAttributesFactoryTest extends GroovyTestCase {
    TSBPlayerAttributesFactory factory = new TSBPlayerAttributesFactory()

    void testNewPlayerAttributes() {
        assert factory.newPlayerAttributes() instanceof TSBPlayerAttributes
    }

    void testNewManualPlayerAttributes() {
        assert factory.newManualPlayerAttributes() instanceof TSBPlayerAttributes
    }

    void testNewSystemPlayerAttributes() {
        assertNull(factory.newSystemPlayerAttributes())
    }
}
