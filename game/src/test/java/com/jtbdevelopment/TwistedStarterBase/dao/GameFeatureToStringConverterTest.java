package com.jtbdevelopment.TwistedStarterBase.dao;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

/**
 * Date: 5/30/18 Time: 6:53 AM
 */
public class GameFeatureToStringConverterTest {

    private GameFeatureToStringConverter converter = new GameFeatureToStringConverter();

    @Test
    public void testConverts() {
        assertEquals("Option2Yes", converter.convert(GameFeature.Option2Yes));
    }

    @Test
    public void testConvertsNull() {
        assertNull(converter.convert(null));
    }
}
