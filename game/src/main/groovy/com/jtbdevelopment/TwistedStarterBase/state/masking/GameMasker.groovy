package com.jtbdevelopment.TwistedStarterBase.state.masking

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame
import com.jtbdevelopment.games.mongo.state.masking.AbstractMongoMultiPlayerGameMasker
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Date: 7/13/16
 * Time: 7:07 PM
 */
@Component
@CompileStatic
class GameMasker extends AbstractMongoMultiPlayerGameMasker<GameFeature, TSBGame, MaskedGame> {
    protected MaskedGame newMaskedGame() {
        return new MaskedGame()
    }
}
