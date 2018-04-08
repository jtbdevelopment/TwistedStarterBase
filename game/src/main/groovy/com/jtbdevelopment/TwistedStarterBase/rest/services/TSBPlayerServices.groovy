package com.jtbdevelopment.TwistedStarterBase.rest.services

import com.fasterxml.jackson.databind.ObjectMapper
import com.jtbdevelopment.TwistedStarterBase.rest.data.FeaturesAndPlayers
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame
import com.jtbdevelopment.games.rest.AbstractMultiPlayerServices
import com.jtbdevelopment.games.rest.handlers.NewGameHandler
import groovy.transform.CompileStatic
import org.bson.types.ObjectId
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

/**
 * Date: 11/14/14
 * Time: 6:40 AM
 */
@Component
@CompileStatic
class TSBPlayerServices extends AbstractMultiPlayerServices<ObjectId> {

    private static final Logger logger = LoggerFactory.getLogger(TSBPlayerServices.class)

    @Autowired
    NewGameHandler newGameHandler

    @Autowired
    ObjectMapper objectMapper;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("new")
    String createNewGame(final FeaturesAndPlayers featuresAndPlayers) {
        try {
            logger.warn("Start")

            def game = (TSBMaskedGame) newGameHandler.handleCreateNewGame(
                    (Serializable) playerID.get(),
                    featuresAndPlayers.players,
                    featuresAndPlayers.features)
            def string = objectMapper.writeValueAsString(game)
            logger.warn(string)
            return string
        } finally {
            logger.warn("End")
        }
    }

    /*
    @PUT
    @Path('changeTheme/{newTheme}')
    @Produces(MediaType.APPLICATION_JSON)
    public Object changeTheme(@PathParam('newTheme') String newTheme) {
        Player player = playerRepository.findOne((ObjectId) playerID.get())
        TBPlayerAttributes playerAttributes = (TBPlayerAttributes) player.gameSpecificPlayerAttributes
        if (StringUtils.isEmpty(newTheme) || !playerAttributes.availableThemes.contains(newTheme)) {
            throw new NotAValidThemeException()
        }
        playerAttributes.theme = newTheme
        return playerRepository.save(player)
    }
    */
}
