package com.jtbdevelopment.TwistedStarterBase.player

import com.jtbdevelopment.games.players.GameSpecificPlayerAttributes
import com.jtbdevelopment.games.players.GameSpecificPlayerAttributesFactory
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Date: 2/2/15
 * Time: 5:37 PM
 */
@Component
@CompileStatic
class TSBPlayerAttributesFactory implements GameSpecificPlayerAttributesFactory {
    @Override
    GameSpecificPlayerAttributes newPlayerAttributes() {
        return new TSBPlayerAttributes()
    }

    @Override
    GameSpecificPlayerAttributes newManualPlayerAttributes() {
        return new TSBPlayerAttributes()
    }

    @Override
    GameSpecificPlayerAttributes newSystemPlayerAttributes() {
        return null
    }
}
