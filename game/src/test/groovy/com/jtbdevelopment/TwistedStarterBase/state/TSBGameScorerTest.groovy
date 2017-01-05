package com.jtbdevelopment.TwistedStarterBase.state

/**
 * Date: 7/13/16
 * Time: 9:28 PM
 */
class TSBGameScorerTest extends GroovyTestCase {

    TSBGameScorer scorer = new TSBGameScorer()

    void testScoreGameReturnsGame() {
        TSBGame game = new TSBGame()

        assert game.is(scorer.scoreGame(game))
    }
}
