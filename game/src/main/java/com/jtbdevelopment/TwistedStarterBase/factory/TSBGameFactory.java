package com.jtbdevelopment.TwistedStarterBase.factory;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import com.jtbdevelopment.games.factory.AbstractMultiPlayerGameFactory;
import com.jtbdevelopment.games.factory.GameInitializer;
import com.jtbdevelopment.games.factory.GameValidator;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Date: 7/13/16
 * Time: 9:30 PM
 */
@Component
public class TSBGameFactory extends AbstractMultiPlayerGameFactory<TSBGame, GameFeature> {
    public TSBGameFactory(
            final List<GameInitializer> gameInitializers,
            final List<GameValidator> gameValidators) {
        super(gameInitializers, gameValidators);
    }

    protected TSBGame newGame() {
        return new TSBGame();
    }

}
