package com.jtbdevelopment.TwistedStarterBase.rest.services;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertTrue;

import com.jtbdevelopment.TwistedStarterBase.rest.data.FeaturesAndPlayers;
import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame;
import com.jtbdevelopment.games.mongo.players.MongoPlayer;
import com.jtbdevelopment.games.rest.handlers.NewGameHandler;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.mockito.Mockito;

/**
 * Date: 7/13/16 Time: 9:44 PM
 */
public class TSBPlayerServicesTest {

  private NewGameHandler<ObjectId, GameFeature, TSBGame, TSBMaskedGame, MongoPlayer> newGameHandler = Mockito
      .mock(NewGameHandler.class);
  private TSBPlayerServices playerServices = new TSBPlayerServices(null, null, null, null, null,
      newGameHandler);

  @Test
  public void testCreateNewGame() {
    ObjectId APLAYER = new ObjectId();
    playerServices.getPlayerID().set(APLAYER);
    Set<GameFeature> features = new HashSet<>(
        Arrays.asList(GameFeature.Option2No, GameFeature.Compete));
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
    Method gameServices = TSBPlayerServices.class
        .getMethod("createNewGame", FeaturesAndPlayers.class);
    assertEquals(4, gameServices.getAnnotations().length);
    assertTrue(gameServices.isAnnotationPresent(Path.class));
    assertEquals("new", gameServices.getAnnotation(Path.class).value());
    assertTrue(gameServices.isAnnotationPresent(Consumes.class));
    assertArrayEquals(Collections.singletonList(MediaType.APPLICATION_JSON).toArray(),
        gameServices.getAnnotation(Consumes.class).value());
    assertTrue(gameServices.isAnnotationPresent(Produces.class));
    assertArrayEquals(Collections.singletonList(MediaType.APPLICATION_JSON).toArray(),
        gameServices.getAnnotation(Produces.class).value());
    assertTrue(gameServices.isAnnotationPresent(POST.class));
    Annotation[][] params = gameServices.getParameterAnnotations();
    assertEquals(1, params.length);
    assertEquals(0, params[0].length);
  }
}
