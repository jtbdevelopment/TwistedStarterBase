package com.jtbdevelopment.TwistedStarterBase.rest.services;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame;
import com.jtbdevelopment.games.mongo.players.MongoPlayer;
import com.jtbdevelopment.games.rest.AbstractMultiPlayerGameServices;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

/**
 * Date: 11/11/14
 * Time: 9:42 PM
 */
@SuppressWarnings("unused")
@Component
public class TSBGameServices extends AbstractMultiPlayerGameServices<ObjectId, GameFeature, TSBGame, TSBMaskedGame, MongoPlayer> {
}
