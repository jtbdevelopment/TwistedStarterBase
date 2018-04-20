package com.jtbdevelopment.TwistedStarterBase.rest.services;

import com.jtbdevelopment.TwistedStarterBase.rest.data.FeaturesAndPlayers;
import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame;
import com.jtbdevelopment.games.rest.handlers.NewGameHandler;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.mockito.Mockito;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.*;

import static org.junit.Assert.*;

/**
 * Date: 7/13/16
 * Time: 9:44 PM
 */
public class TSBPlayerServicesTest {
    private NewGameHandler newGameHandler = Mockito.mock(NewGameHandler.class);
    private TSBPlayerServices playerServices = new TSBPlayerServices(newGameHandler);

    @Test
    public void testCreateNewGame() {
        ObjectId APLAYER = new ObjectId();
        playerServices.getPlayerID().set(APLAYER);
        Set<GameFeature> features = new HashSet<>(Arrays.asList(GameFeature.Option2No, GameFeature.Compete));
        List<String> players = Arrays.asList("1", "2", "3");
        FeaturesAndPlayers input = new FeaturesAndPlayers();
        input.setFeatures(features);
        input.setPlayers(players);
        TSBMaskedGame game = new TSBMaskedGame();
        Mockito.when(newGameHandler.handleCreateNewGame(APLAYER, players, features)).thenReturn(game);
        assertSame(game, playerServices.createNewGame(input));
    }

    @Test
    public void testCreateNewGameAnnotations() throws NoSuchMethodException {
        Method gameServices = TSBPlayerServices.class.getMethod("createNewGame", FeaturesAndPlayers.class);
        assertEquals(4, gameServices.getAnnotations().length);
        assertTrue(gameServices.isAnnotationPresent(Path.class));
        assertEquals("new", gameServices.getAnnotation(Path.class).value());
        assertTrue(gameServices.isAnnotationPresent(Consumes.class));
        assertArrayEquals(Collections.singletonList(MediaType.APPLICATION_JSON).toArray(), gameServices.getAnnotation(Consumes.class).value());
        assertTrue(gameServices.isAnnotationPresent(Produces.class));
        assertArrayEquals(Collections.singletonList(MediaType.APPLICATION_JSON).toArray(), gameServices.getAnnotation(Produces.class).value());
        assertTrue(gameServices.isAnnotationPresent(POST.class));
        Annotation[][] params = gameServices.getParameterAnnotations();
        assertEquals(1, params.length);
        assertEquals(0, params[0].length);
    }
}
