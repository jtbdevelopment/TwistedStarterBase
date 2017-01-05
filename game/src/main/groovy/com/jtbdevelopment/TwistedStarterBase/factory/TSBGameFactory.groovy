package com.jtbdevelopment.TwistedStarterBase.factory

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame
import com.jtbdevelopment.games.factory.AbstractMultiPlayerGameFactory
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Date: 7/13/16
 * Time: 9:30 PM
 */
@Component
@CompileStatic
class TSBGameFactory extends AbstractMultiPlayerGameFactory<TSBGame, GameFeature> {
    protected TSBGame newGame() {
        return new TSBGame()
    }
}
