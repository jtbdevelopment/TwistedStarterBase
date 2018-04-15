package com.jtbdevelopment.TwistedStarterBase.state

import com.jtbdevelopment.games.state.scoring.GameScorer
import com.jtbdevelopment.games.state.transition.AbstractMPGamePhaseTransitionEngine
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Date: 7/13/16
 * Time: 9:26 PM
 */
@CompileStatic
@Component
class GamePhaseTransitionEngine extends AbstractMPGamePhaseTransitionEngine<TSBGame> {
    GamePhaseTransitionEngine(final GameScorer<TSBGame> gameScorer) {
        super(gameScorer)
    }
}
