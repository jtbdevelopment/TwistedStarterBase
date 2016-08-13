package com.jtbdevelopment.TwistedWordSearch.state
/**
 * Date: 7/13/16
 * Time: 6:41 PM
 */
class GameFeatureTest extends GroovyTestCase {
    void testGetGroupedFeatures() {
        assert [
                (GameFeature.Grid)             : [GameFeature.Grid30X30, GameFeature.Grid40X40, GameFeature.Grid50X50, GameFeature.CircleX40, GameFeature.CircleX50, GameFeature.PyramidX40, GameFeature.PyramidX50],
                (GameFeature.AverageWordLength): [GameFeature.AverageOf5, GameFeature.AverageOf4, GameFeature.AverageOf3, GameFeature.AverageOf6, GameFeature.AverageOf7],
                (GameFeature.WordWrap)         : [GameFeature.WordWrapYes, GameFeature.WordWrapNo],
                (GameFeature.FillDifficulty)   : [GameFeature.RandomFill, GameFeature.SomeOverlap, GameFeature.StrongOverlap, GameFeature.WordChunks],
                (GameFeature.JumbleOnFind)     : [GameFeature.JumbleOnFindNo, GameFeature.JumbleOnFindYes],
                (GameFeature.HideWordLetters)  : [GameFeature.HideWordLettersNone, GameFeature.HideWordLettersSome, GameFeature.HideWordLettersMany],
        ] == GameFeature.groupedFeatures
    }
}
