package com.jtbdevelopment.TwistedStarterBase.state
/**
 * Date: 7/13/16
 * Time: 6:41 PM
 */
class GameFeatureTest extends GroovyTestCase {
    void testGetGroupedFeatures() {
        assert [
                (GameFeature.Option1): [GameFeature.Choice1, GameFeature.Choice2, GameFeature.Choice3],
                (GameFeature.Option2): [GameFeature.Option2Yes, GameFeature.Option2No],
                (GameFeature.Option3): [GameFeature.Solo, GameFeature.Collaborate, GameFeature.Compete],
        ] == GameFeature.groupedFeatures
    }
}
