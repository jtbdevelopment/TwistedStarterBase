package com.jtbdevelopment.TwistedStarterBase.rest.data;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import java.util.Arrays;
import java.util.Collections;
import org.junit.Assert;
import org.junit.Test;

/**
 * Date: 7/18/16 Time: 4:26 PM
 */
public class GameFeatureInfoTest {

  private GameFeatureInfo test = new GameFeatureInfo(
      GameFeature.Option1,
      Arrays.asList(
          new GameFeatureInfo.Detail(GameFeature.Choice1),
          new GameFeatureInfo.Detail(GameFeature.Choice2),
          new GameFeatureInfo.Detail(GameFeature.Choice3)));

  @Test
  public void testEquals() {
    Assert.assertEquals(GameFeature.Option1.hashCode(), test.hashCode());
  }

  @Test
  public void testHashCode() {
    Assert.assertNotEquals(new GameFeatureInfo(GameFeature.Option1, Collections.emptyList()), test);
    Assert.assertNotEquals(new GameFeatureInfo(GameFeature.Option2, Collections.emptyList()), test);
    Assert.assertEquals(new GameFeatureInfo(
            GameFeature.Option1,
            Arrays.asList(
                new GameFeatureInfo.Detail(GameFeature.Choice1),
                new GameFeatureInfo.Detail(GameFeature.Choice2),
                new GameFeatureInfo.Detail(GameFeature.Choice3))),
        test);
  }

  @Test
  public void testGetFeature() {
    GameFeatureInfo.Detail detail = test.getFeature();
    Assert.assertEquals(GameFeature.Option1.getDescription(), detail.getDescription());
    Assert.assertEquals(GameFeature.Option1.getGroupType(), detail.getGroupType());
    Assert.assertEquals(GameFeature.Option1.getLabel(), detail.getLabel());
    Assert.assertEquals(GameFeature.Option1, detail.getFeature());
  }

  @Test
  public void testGetOptions() {
    Assert.assertEquals(
        Arrays.asList(
            new GameFeatureInfo.Detail(GameFeature.Choice1),
            new GameFeatureInfo.Detail(GameFeature.Choice2),
            new GameFeatureInfo.Detail(GameFeature.Choice3)),
        test.getOptions());
  }

  @Test
  public void testGetOptionDetailOfOption() {
    GameFeatureInfo.Detail detail = test.getOptions().get(0);
    Assert.assertEquals(GameFeature.Choice1, detail.getFeature());
    Assert.assertEquals(GameFeature.Choice1.getDescription(), detail.getDescription());
    Assert.assertEquals(GameFeature.Choice1.getGroupType(), detail.getGroupType());
    Assert.assertEquals(GameFeature.Choice1.getGroupType(), detail.getGroupType());
    Assert.assertEquals(GameFeature.Choice1.getLabel(), detail.getLabel());
    Assert.assertEquals(GameFeature.Choice1.getGroup(), detail.getGroup());
  }

  @Test
  public void testGetDetailHashCode() {
    Assert.assertEquals(GameFeature.Choice1.hashCode(), test.getOptions().get(0).hashCode());
    Assert.assertEquals(GameFeature.Choice2.hashCode(), test.getOptions().get(1).hashCode());
  }

  @Test
  public void testGetDetailEquals() {
    Assert.assertEquals(new GameFeatureInfo.Detail(GameFeature.Choice1), test.getOptions().get(0));
    Assert.assertEquals(new GameFeatureInfo.Detail(GameFeature.Choice2), test.getOptions().get(1));
    Assert
        .assertNotEquals(new GameFeatureInfo.Detail(GameFeature.Compete), test.getOptions().get(1));
    Assert.assertNotEquals(new GameFeatureInfo.Detail(GameFeature.Solo), test.getOptions().get(0));
  }
}
