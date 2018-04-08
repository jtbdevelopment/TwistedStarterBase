package com.jtbdevelopment.TwistedStarterBase.state;

import com.jtbdevelopment.games.mongo.state.AbstractMongoMultiPlayerGame;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Date: 7/13/16
 * Time: 7:04 PM
 */
@Document(collection = "game")
public class TSBGame extends AbstractMongoMultiPlayerGame<GameFeature> {
}
