package com.jtbdevelopment.TwistedWordSearch.rest.data

import com.jtbdevelopment.TwistedWordSearch.state.GameFeature

/**
 * Date: 7/18/16
 * Time: 4:26 PM
 */
class GameFeatureInfoTest extends GroovyTestCase {
    GameFeatureInfo test = new GameFeatureInfo(GameFeature.Option1,
            [
                    new GameFeatureInfo.Detail(GameFeature.Choice1),
                    new GameFeatureInfo.Detail(GameFeature.Choice2),
                    new GameFeatureInfo.Detail(GameFeature.Choice3)
            ]
    )

    void testEquals() {
        assert GameFeature.Option1.hashCode() == test.hashCode()
    }

    void testHashCode() {
        assertFalse new GameFeatureInfo(GameFeature.Option1, []) == test
        assertFalse new GameFeatureInfo(GameFeature.Option2, []) == test
        assert new GameFeatureInfo(GameFeature.Option1,
                [
                        new GameFeatureInfo.Detail(GameFeature.Choice1),
                        new GameFeatureInfo.Detail(GameFeature.Choice2),
                        new GameFeatureInfo.Detail(GameFeature.Choice3)
                ]
        ) == test
    }

    void testGetFeature() {
        GameFeatureInfo.Detail detail = test.feature
        assert GameFeature.Option1.description == detail.description
        assert GameFeature.Option1.groupType == detail.groupType
        assert GameFeature.Option1.label == detail.label
        assert GameFeature.Option1 == detail.feature
    }

    void testGetOptions() {
        assert [
                new GameFeatureInfo.Detail(GameFeature.Choice1),
                new GameFeatureInfo.Detail(GameFeature.Choice2),
                new GameFeatureInfo.Detail(GameFeature.Choice3)
        ] == test.options
    }

    void testGetOptionDetailOfOption() {
        GameFeatureInfo.Detail detail = test.options[0]
        assert GameFeature.Choice1 == detail.feature
        assert GameFeature.Choice1.description == detail.description
        assert GameFeature.Choice1.groupType == detail.groupType
        assert GameFeature.Choice1.groupType == detail.groupType
        assert GameFeature.Choice1.label == detail.label
    }

    void testGetDetailHashCode() {
        assert GameFeature.Choice1.hashCode() == test.options[0].hashCode()
        assert GameFeature.Choice2.hashCode() == test.options[1].hashCode()
    }

    void testGetDetailEquals() {
        assert new GameFeatureInfo.Detail(GameFeature.Choice1) == test.options[0]
        assert new GameFeatureInfo.Detail(GameFeature.Choice2) == test.options[1]
        assertFalse new GameFeatureInfo.Detail(GameFeature.Compete) == test.options[1]
        assertFalse new GameFeatureInfo.Detail(GameFeature.Solo) == test.options[0]
    }
}
