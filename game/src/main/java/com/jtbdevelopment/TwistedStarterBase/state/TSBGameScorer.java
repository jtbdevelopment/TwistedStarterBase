package com.jtbdevelopment.TwistedStarterBase.state;

import com.jtbdevelopment.games.state.scoring.GameScorer;
import org.springframework.stereotype.Component;

/**
 * Date: 7/13/16
 * Time: 9:27 PM
 */
@Component
public class TSBGameScorer implements GameScorer<TSBGame> {
    public TSBGame scoreGame(final TSBGame game) {
        return game;
    }

}
