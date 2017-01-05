package com.jtbdevelopment.TwistedStarterBase.state

import com.jtbdevelopment.games.state.scoring.GameScorer
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Date: 7/13/16
 * Time: 9:27 PM
 */
@CompileStatic
@Component
class TSBGameScorer implements GameScorer<TSBGame> {
    TSBGame scoreGame(final TSBGame game) {
        return game
    }
}
