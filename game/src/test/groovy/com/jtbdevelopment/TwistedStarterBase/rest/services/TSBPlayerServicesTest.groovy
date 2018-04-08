package com.jtbdevelopment.TwistedStarterBase.rest.services

import com.jtbdevelopment.TwistedStarterBase.rest.data.FeaturesAndPlayers
import com.jtbdevelopment.TwistedStarterBase.state.GameFeature
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame
import com.jtbdevelopment.games.rest.handlers.NewGameHandler
import groovy.transform.TypeChecked
import org.bson.types.ObjectId

import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

/**
 * Date: 7/13/16
 * Time: 9:44 PM
 */
class TSBPlayerServicesTest extends GroovyTestCase {
    TSBPlayerServices playerServices = new TSBPlayerServices()

    void testCreateNewGame() {
        def APLAYER = new ObjectId()
        playerServices.playerID.set(APLAYER)
        def features = [GameFeature.Option2No, GameFeature.Compete] as Set
        def players = ["1", "2", "3"]
        FeaturesAndPlayers input = new FeaturesAndPlayers(features: features, players: players)
        TSBMaskedGame game = new TSBMaskedGame()
        playerServices.newGameHandler = [
                handleCreateNewGame: {
                    Serializable i, List<String> p, Set<GameFeature> f ->
                        assert i == APLAYER
                        assert p == players
                        assert f == features
                        game
                }
        ] as NewGameHandler
        assert game.is(playerServices.createNewGame(input))
    }

    void testCreateNewGameAnnotations() {
        def gameServices = TSBPlayerServices.getMethod("createNewGame", [FeaturesAndPlayers.class] as Class[])
        assert (gameServices.annotations.size() == 4 ||
                (gameServices.isAnnotationPresent(TypeChecked.TypeCheckingInfo) && gameServices.annotations.size() == 5)
        )
        assert gameServices.isAnnotationPresent(Path.class)
        assert gameServices.getAnnotation(Path.class).value() == "new"
        assert gameServices.isAnnotationPresent(Consumes.class)
        assert gameServices.getAnnotation(Consumes.class).value() == [MediaType.APPLICATION_JSON]
        assert gameServices.isAnnotationPresent(Produces.class)
        assert gameServices.getAnnotation(Produces.class).value() == [MediaType.APPLICATION_JSON]
        assert gameServices.isAnnotationPresent(POST.class)
        def params = gameServices.parameterAnnotations
        assert params.length == 1
        assert params[0].length == 0
    }

}
