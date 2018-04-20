package com.jtbdevelopment.TwistedStarterBase.rest.services;

import com.jtbdevelopment.TwistedStarterBase.rest.data.GameFeatureInfo;
import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

/**
 * Date: 7/18/16
 * Time: 4:14 PM
 */
public class TSBPlayerGatewayServiceTest {
    private TSBPlayerGatewayService service = new TSBPlayerGatewayService();

    @Test
    public void testFeaturesAndDescriptions() {
        List<GameFeatureInfo> descriptions = service.featuresAndDescriptions();
        Assert.assertEquals(
                Arrays.asList(
                        new GameFeatureInfo(
                                GameFeature.Option1,
                                Arrays.asList(
                                        new GameFeatureInfo.Detail(GameFeature.Choice1),
                                        new GameFeatureInfo.Detail(GameFeature.Choice2),
                                        new GameFeatureInfo.Detail(GameFeature.Choice3))),
                        new GameFeatureInfo(
                                GameFeature.Option2,
                                Arrays.asList(
                                        new GameFeatureInfo.Detail(GameFeature.Option2Yes),
                                        new GameFeatureInfo.Detail(GameFeature.Option2No))),
                        new GameFeatureInfo(
                                GameFeature.Option3,
                                Arrays.asList(new GameFeatureInfo.Detail(GameFeature.Solo),
                                        new GameFeatureInfo.Detail(GameFeature.Collaborate),
                                        new GameFeatureInfo.Detail(GameFeature.Compete)))),
                descriptions);
    }
}
