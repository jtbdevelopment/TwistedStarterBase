package com.jtbdevelopment.TwistedStarterBase.factory

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame
import com.jtbdevelopment.games.factory.AbstractMultiPlayerGameFactory
import com.jtbdevelopment.games.factory.GameInitializer
import com.jtbdevelopment.games.factory.GameValidator
import com.jtbdevelopment.games.state.Game
import org.springframework.stereotype.Component

/**
 * Date: 7/13/16
 * Time: 9:30 PM
 */
@Component
class TSBGameFactory extends AbstractMultiPlayerGameFactory<TSBGame, GameFeature> {
    TSBGameFactory(
            final List<GameInitializer<? extends Game>> gameInitializers,
            final List<GameValidator<? extends Game>> gameValidators) {
        super(gameInitializers, gameValidators)
    }

    protected TSBGame newGame() {
        return new TSBGame()
    }
}
