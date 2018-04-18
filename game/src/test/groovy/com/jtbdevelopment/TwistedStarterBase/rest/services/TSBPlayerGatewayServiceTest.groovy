package com.jtbdevelopment.TwistedStarterBase.rest.services

import com.jtbdevelopment.TwistedStarterBase.rest.data.GameFeatureInfo
import com.jtbdevelopment.TwistedStarterBase.state.GameFeature

/**
 * Date: 7/18/16
 * Time: 4:14 PM
 */
class TSBPlayerGatewayServiceTest extends GroovyTestCase {
    TSBPlayerGatewayService service = new TSBPlayerGatewayService()

    void testFeaturesAndDescriptions() {
        def descriptions = service.featuresAndDescriptions()
        assert [
                new GameFeatureInfo(
                        GameFeature.Option1,
                        [
                                new GameFeatureInfo.Detail(GameFeature.Choice1),
                                new GameFeatureInfo.Detail(GameFeature.Choice2),
                                new GameFeatureInfo.Detail(GameFeature.Choice3),
                        ]
                ),
                new GameFeatureInfo(
                        GameFeature.Option2,
                        [
                                new GameFeatureInfo.Detail(GameFeature.Option2Yes),
                                new GameFeatureInfo.Detail(GameFeature.Option2No),
                        ]
                ),
                new GameFeatureInfo(
                        GameFeature.Option3,
                        [
                                new GameFeatureInfo.Detail(GameFeature.Solo),
                                new GameFeatureInfo.Detail(GameFeature.Collaborate),
                                new GameFeatureInfo.Detail(GameFeature.Compete),
                        ]
                ),
        ] == descriptions
    }
}
