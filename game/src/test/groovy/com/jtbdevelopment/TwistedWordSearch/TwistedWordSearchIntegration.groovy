package com.jtbdevelopment.TwistedWordSearch

import com.jtbdevelopment.TwistedWordSearch.dao.GameRepository
import com.jtbdevelopment.TwistedWordSearch.rest.data.FeaturesAndPlayers
import com.jtbdevelopment.TwistedWordSearch.rest.data.GameFeatureInfo
import com.jtbdevelopment.TwistedWordSearch.state.GameFeature
import com.jtbdevelopment.TwistedWordSearch.state.TWSGame
import com.jtbdevelopment.TwistedWordSearch.state.masking.MaskedGame
import com.jtbdevelopment.core.hazelcast.caching.HazelcastCacheManager
import com.jtbdevelopment.games.dao.AbstractGameRepository
import com.jtbdevelopment.games.dev.utilities.integrationtesting.AbstractGameIntegration
import org.junit.BeforeClass
import org.junit.Test

import javax.ws.rs.client.Entity
import javax.ws.rs.client.WebTarget
import javax.ws.rs.core.GenericType
import javax.ws.rs.core.MediaType

/**
 * Date: 7/13/16
 * Time: 6:57 PM
 */
class TwistedWordSearchIntegration extends AbstractGameIntegration<TWSGame, MaskedGame> {
    Class<MaskedGame> returnedGameClass() {
        return MaskedGame.class
    }

    Class<TWSGame> internalGameClass() {
        return TWSGame.class
    }

    TWSGame newGame() {
        return new TWSGame()
    }

    AbstractGameRepository gameRepository() {
        return gameRepository
    }
    static HazelcastCacheManager cacheManager
    static GameRepository gameRepository

    @BeforeClass
    static void setup() {
        cacheManager = context.getBean(HazelcastCacheManager.class)
        gameRepository = context.getBean(GameRepository.class)
    }

    @Test
    void testGetFeatures() {
        def client = createAPITarget(TEST_PLAYER2)
        def features = client.path("features").request(MediaType.APPLICATION_JSON_TYPE).get(
                new GenericType<List<GameFeatureInfo>>() {
                })
        assert features == [
                new GameFeatureInfo(
                        GameFeature.Option1,
                        [
                                new GameFeatureInfo.Detail(GameFeature.Choice1),
                                new GameFeatureInfo.Detail(GameFeature.Choice2),
                                new GameFeatureInfo.Detail(GameFeature.Choice3),
                        ]
                ),
                new GameFeatureInfo(
                        GameFeature.Option2,
                        [
                                new GameFeatureInfo.Detail(GameFeature.Option2Yes),
                                new GameFeatureInfo.Detail(GameFeature.Option2No),
                        ]
                ),
                new GameFeatureInfo(
                        GameFeature.Option3,
                        [
                                new GameFeatureInfo.Detail(GameFeature.Solo),
                                new GameFeatureInfo.Detail(GameFeature.Collaborate),
                                new GameFeatureInfo.Detail(GameFeature.Compete),
                        ]
                ),
        ]
    }

    //  TODO - doesn't do much yet
    @Test
    void testCreateNewGame() {
        def P3 = createPlayerAPITarget(TEST_PLAYER3)
        MaskedGame game = newGame(P3,
                new FeaturesAndPlayers(
                        features: [
                                GameFeature.Option2No,
                                GameFeature.Choice3,
                                GameFeature.Compete,
                        ] as Set,
                        players: [TEST_PLAYER3.md5],
                ))
        assert game
    }

    protected MaskedGame newGame(WebTarget target, FeaturesAndPlayers featuresAndPlayers) {
        def entity = Entity.entity(
                featuresAndPlayers,
                MediaType.APPLICATION_JSON)
        target.path("new")
                .request(MediaType.APPLICATION_JSON)
                .post(entity, returnedGameClass())
    }

}
