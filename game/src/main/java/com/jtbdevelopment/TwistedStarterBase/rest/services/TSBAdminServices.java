package com.jtbdevelopment.TwistedStarterBase.rest.services;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import com.jtbdevelopment.games.dao.AbstractGameRepository;
import com.jtbdevelopment.games.dao.AbstractPlayerRepository;
import com.jtbdevelopment.games.dao.StringToIDConverter;
import com.jtbdevelopment.games.mongo.players.MongoPlayer;
import com.jtbdevelopment.games.rest.services.AbstractAdminServices;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

/**
 * Date: 11/27/2014
 * Time: 6:34 PM
 */
@SuppressWarnings("unused")
@Component
public class TSBAdminServices extends AbstractAdminServices<ObjectId, GameFeature, TSBGame, MongoPlayer> {
    public TSBAdminServices(
            final AbstractPlayerRepository<ObjectId, MongoPlayer> playerRepository,
            final AbstractGameRepository<ObjectId, GameFeature, TSBGame> gameRepository,
            final StringToIDConverter<ObjectId> stringToIDConverter) {
        super(playerRepository, gameRepository, stringToIDConverter);
    }
}
