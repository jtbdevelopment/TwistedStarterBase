package com.jtbdevelopment.TwistedWordSearch.dao

import com.jtbdevelopment.TwistedWordSearch.state.GameFeature
import com.jtbdevelopment.TwistedWordSearch.state.TWSGame
import com.jtbdevelopment.games.mongo.dao.AbstractMongoMultiPlayerGameRepository
import com.jtbdevelopment.games.state.GamePhase
import groovy.transform.CompileStatic
import org.bson.types.ObjectId
import org.springframework.data.domain.Pageable

import java.time.ZonedDateTime

/**
 * Date: 7/13/16
 * Time: 7:13 PM
 */
@CompileStatic
interface GameRepository extends AbstractMongoMultiPlayerGameRepository<GameFeature, TWSGame> {
}

