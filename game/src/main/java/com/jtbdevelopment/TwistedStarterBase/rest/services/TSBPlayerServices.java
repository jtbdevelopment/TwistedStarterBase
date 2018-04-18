package com.jtbdevelopment.TwistedStarterBase.rest.services;

import com.jtbdevelopment.TwistedStarterBase.rest.data.FeaturesAndPlayers;
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame;
import com.jtbdevelopment.games.rest.AbstractMultiPlayerServices;
import com.jtbdevelopment.games.rest.handlers.NewGameHandler;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Date: 11/14/14
 * Time: 6:40 AM
 */
@Component
public class TSBPlayerServices extends AbstractMultiPlayerServices<ObjectId> {
    private final NewGameHandler newGameHandler;

    public TSBPlayerServices(final NewGameHandler newGameHandler) {
        this.newGameHandler = newGameHandler;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("new")
    public TSBMaskedGame createNewGame(final FeaturesAndPlayers featuresAndPlayers) {
        return (TSBMaskedGame) newGameHandler.handleCreateNewGame(getPlayerID().get(), featuresAndPlayers.getPlayers(), featuresAndPlayers.getFeatures());
    }
}
