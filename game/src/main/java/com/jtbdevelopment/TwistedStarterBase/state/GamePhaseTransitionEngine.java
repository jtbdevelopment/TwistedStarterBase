package com.jtbdevelopment.TwistedStarterBase.state;

import com.jtbdevelopment.games.state.scoring.GameScorer;
import com.jtbdevelopment.games.state.transition.AbstractMPGamePhaseTransitionEngine;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

/**
 * Date: 7/13/16 Time: 9:26 PM
 */
@SuppressWarnings("unused")
@Component
public class GamePhaseTransitionEngine extends
    AbstractMPGamePhaseTransitionEngine<ObjectId, GameFeature, TSBGame> {

  public GamePhaseTransitionEngine(final GameScorer<TSBGame> gameScorer) {
    super(gameScorer);
  }
}
