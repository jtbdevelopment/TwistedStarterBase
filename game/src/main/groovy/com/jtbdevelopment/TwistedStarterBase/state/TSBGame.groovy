package com.jtbdevelopment.TwistedStarterBase.state

import com.jtbdevelopment.games.mongo.state.AbstractMongoMultiPlayerGame
import groovy.transform.CompileStatic
import org.springframework.data.mongodb.core.mapping.Document

/**
 * Date: 7/13/16
 * Time: 7:04 PM
 */
@CompileStatic
@Document(collection = 'game')
class TSBGame extends AbstractMongoMultiPlayerGame<GameFeature> {
}
