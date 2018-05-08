package com.jtbdevelopment.TwistedStarterBase.state;

import org.junit.Assert;
import org.junit.Test;

/**
 * Date: 7/13/16 Time: 9:28 PM
 */
public class TSBGameScorerTest {

  private TSBGameScorer scorer = new TSBGameScorer();

  @Test
  public void testScoreGameReturnsGame() {
    TSBGame game = new TSBGame();

    Assert.assertSame(game, scorer.scoreGame(game));
  }
}
