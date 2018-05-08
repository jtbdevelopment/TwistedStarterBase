package com.jtbdevelopment.TwistedStarterBase.factory;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotSame;

import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import java.util.Collections;
import org.junit.Test;

/**
 * Date: 7/13/16 Time: 9:32 PM
 */
public class TSBGameFactoryTest {

  private TSBGameFactory factory = new TSBGameFactory(Collections.emptyList(),
      Collections.emptyList());

  @Test
  public void testCreatesNewGame() {
    TSBGame game1 = factory.newGame();
    TSBGame game2 = factory.newGame();

    assertNotNull(game1);
    assertNotNull(game2);
    assertNotSame(game1, game2);
  }
}
