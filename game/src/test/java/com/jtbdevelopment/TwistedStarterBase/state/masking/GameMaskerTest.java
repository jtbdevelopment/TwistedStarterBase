package com.jtbdevelopment.TwistedStarterBase.state.masking;

import static org.junit.Assert.assertEquals;

import junit.framework.TestCase;
import org.bson.types.ObjectId;
import org.junit.Test;

/**
 * Date: 7/13/16 Time: 7:09 PM
 */
public class GameMaskerTest {

  private GameMasker masker = new GameMasker();

  @Test
  public void testNewMaskedGame() {
    TSBMaskedGame game = masker.newMaskedGame();
    TestCase.assertNotNull(game);
  }

  @Test
  public void testGetIDClass() {
    assertEquals(ObjectId.class, masker.getIDClass());
  }
}
