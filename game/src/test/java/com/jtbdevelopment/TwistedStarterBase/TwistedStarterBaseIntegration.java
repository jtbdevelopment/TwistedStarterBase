package com.jtbdevelopment.TwistedStarterBase;

import com.jtbdevelopment.TwistedStarterBase.dao.GameRepository;
import com.jtbdevelopment.TwistedStarterBase.rest.data.FeaturesAndPlayers;
import com.jtbdevelopment.TwistedStarterBase.rest.data.GameFeatureInfo;
import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame;
import com.jtbdevelopment.core.hazelcast.caching.HazelcastCacheManager;
import com.jtbdevelopment.games.dao.AbstractGameRepository;
import com.jtbdevelopment.games.dev.utilities.integrationtesting.AbstractGameIntegration;
import org.junit.BeforeClass;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Date: 7/13/16 Time: 6:57 PM
 */
public class TwistedStarterBaseIntegration extends AbstractGameIntegration<TSBGame, TSBMaskedGame> {

    private static HazelcastCacheManager cacheManager;
    private static GameRepository gameRepository;

    @BeforeClass
    public static void setup() {
        cacheManager = applicationContext.getBean(HazelcastCacheManager.class);
        gameRepository = applicationContext.getBean(GameRepository.class);
    }

    @Override
    protected Class<TSBMaskedGame> returnedGameClass() {
        return TSBMaskedGame.class;
    }

    @Override
    protected Class<TSBGame> internalGameClass() {
        return TSBGame.class;
    }

    @Override
    public TSBGame newGame() {
        return new TSBGame();
    }

    @Override
    public AbstractGameRepository gameRepository() {
        return gameRepository;
    }

    @Test
    public void testGetFeatures() {
        WebTarget client = AbstractGameIntegration.createAPITarget(TEST_PLAYER2);
        List<GameFeatureInfo> features = client.path("features")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get(new GenericType<List<GameFeatureInfo>>() {
                });
        List<GameFeatureInfo> expected = Arrays.asList(
                new GameFeatureInfo(GameFeature.Option1,
                        Arrays.asList(new GameFeatureInfo.Detail(GameFeature.Choice1),
                                new GameFeatureInfo.Detail(GameFeature.Choice2),
                                new GameFeatureInfo.Detail(GameFeature.Choice3))),
                new GameFeatureInfo(GameFeature.Option2,
                        Arrays.asList(new GameFeatureInfo.Detail(GameFeature.Option2Yes),
                                new GameFeatureInfo.Detail(GameFeature.Option2No))),
                new GameFeatureInfo(GameFeature.Option3,
                        Arrays.asList(new GameFeatureInfo.Detail(GameFeature.Solo),
                                new GameFeatureInfo.Detail(GameFeature.Collaborate),
                                new GameFeatureInfo.Detail(GameFeature.Compete))));
        assertEquals(expected, features);
    }

    @Test
    public void testCreateNewGame() {
        WebTarget P3 = AbstractGameIntegration.createPlayerAPITarget(TEST_PLAYER3);
        FeaturesAndPlayers players = new FeaturesAndPlayers();

        players.setFeatures(new HashSet<>(
                Arrays.asList(GameFeature.Option2No, GameFeature.Choice3, GameFeature.Compete)));
        players.setPlayers(Collections.singletonList(TEST_PLAYER3.getMd5()));

        Object game = newGame(P3, players);
        assertNotNull(game);
    }

    private Object newGame(WebTarget target, FeaturesAndPlayers featuresAndPlayers) {
        Entity<FeaturesAndPlayers> entity = Entity
                .entity(featuresAndPlayers, MediaType.APPLICATION_JSON);
        return target.path("new").request(MediaType.APPLICATION_JSON).post(entity, returnedGameClass());
    }
}
