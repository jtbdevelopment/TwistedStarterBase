package com.jtbdevelopment.TwistedStarterBase.state;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.junit.Test;

/**
 * Date: 7/13/16 Time: 6:41 PM
 */
public class GameFeatureTest {

  @Test
  public void testGetGroupedFeatures() {
    Map<GameFeature, List<GameFeature>> map = new LinkedHashMap<>();
    map.put(GameFeature.Option1,
        Arrays.asList(GameFeature.Choice1, GameFeature.Choice2, GameFeature.Choice3));
    map.put(GameFeature.Option2, Arrays.asList(GameFeature.Option2Yes, GameFeature.Option2No));
    map.put(GameFeature.Option3,
        Arrays.asList(GameFeature.Solo, GameFeature.Collaborate, GameFeature.Compete));
    assertEquals(map, GameFeature.getGroupedFeatures());
  }

}
