package com.jtbdevelopment.TwistedStarterBase.dao;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import com.jtbdevelopment.games.mongo.dao.AbstractMongoMultiPlayerGameRepository;

/**
 * Date: 7/13/16
 * Time: 7:13 PM
 */
public interface GameRepository extends AbstractMongoMultiPlayerGameRepository<GameFeature, TSBGame> {
}
