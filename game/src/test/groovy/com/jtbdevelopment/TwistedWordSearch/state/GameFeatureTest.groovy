package com.jtbdevelopment.TwistedWordSearch.state
/**
 * Date: 7/13/16
 * Time: 6:41 PM
 */
class GameFeatureTest extends GroovyTestCase {
    void testGetGroupedFeatures() {
        assert [
                (GameFeature.Grid)          : [
                        GameFeature.Grid20X20,
                        GameFeature.Grid30X30,
                        GameFeature.Grid40X40,
                        GameFeature.Grid50X50,
                        GameFeature.CircleX31,
                        GameFeature.CircleX41,
                        GameFeature.CircleX51,
                        GameFeature.PyramidX40,
                        GameFeature.PyramidX50,
                        GameFeature.Diamond30X30,
                        GameFeature.Diamond40X40,
                        GameFeature.Diamond50X50],
                (GameFeature.WordDifficulty): [GameFeature.BeginnerDifficulty, GameFeature.ExperiencedDifficulty, GameFeature.ExpertDifficulty, GameFeature.ProfessionalDifficulty],
                (GameFeature.WordWrap)      : [GameFeature.WordWrapNo, GameFeature.WordWrapYes],
                (GameFeature.FillDifficulty): [GameFeature.RandomFill, GameFeature.SomeOverlap, GameFeature.StrongOverlap, GameFeature.WordChunks],
                //(GameFeature.JumbleOnFind)  : [GameFeature.JumbleOnFindNo, GameFeature.JumbleOnFindYes],
                //(GameFeature.HideWordLetters): [GameFeature.HideWordLettersNone, GameFeature.HideWordLettersSome, GameFeature.HideWordLettersMany],
        ] == GameFeature.groupedFeatures
    }
}
