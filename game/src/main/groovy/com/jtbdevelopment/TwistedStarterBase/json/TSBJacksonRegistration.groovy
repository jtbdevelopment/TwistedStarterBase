package com.jtbdevelopment.TwistedStarterBase.json

import com.fasterxml.jackson.databind.module.SimpleModule
import com.jtbdevelopment.TwistedStarterBase.player.TSBPlayerAttributes
import com.jtbdevelopment.TwistedStarterBase.state.masking.MaskedGame
import com.jtbdevelopment.games.players.GameSpecificPlayerAttributes
import com.jtbdevelopment.games.state.masking.MaskedMultiPlayerGame
import com.jtbdevelopment.spring.jackson.JacksonModuleCustomization
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Date: 2/8/15
 * Time: 4:08 PM
 */
@Component
@CompileStatic
class TSBJacksonRegistration implements JacksonModuleCustomization {
    @Override
    void customizeModule(final SimpleModule module) {
        module.addAbstractTypeMapping(GameSpecificPlayerAttributes.class, TSBPlayerAttributes.class)
        module.addAbstractTypeMapping(MaskedMultiPlayerGame.class, MaskedGame.class)
        module.registerSubtypes(MaskedGame.class)
    }
}
