package com.jtbdevelopment.TwistedStarterBase.json;

import com.fasterxml.jackson.databind.module.SimpleModule;
import com.jtbdevelopment.TwistedStarterBase.player.TSBPlayerAttributes;
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame;
import com.jtbdevelopment.games.players.GameSpecificPlayerAttributes;
import com.jtbdevelopment.games.state.masking.MaskedMultiPlayerGame;
import org.junit.Test;
import org.mockito.Mockito;

/**
 * Date: 7/26/16 Time: 11:34 PM
 */
public class TSBJacksonRegistrationTest {

  @Test
  public void testCustomizeModule() {
    TSBJacksonRegistration registration = new TSBJacksonRegistration();
    SimpleModule module = Mockito.mock(SimpleModule.class);
    registration.customizeModule(module);
    Mockito.verify(module)
        .addAbstractTypeMapping(GameSpecificPlayerAttributes.class, TSBPlayerAttributes.class);
    Mockito.verify(module).addAbstractTypeMapping(MaskedMultiPlayerGame.class, TSBMaskedGame.class);

  }

}
