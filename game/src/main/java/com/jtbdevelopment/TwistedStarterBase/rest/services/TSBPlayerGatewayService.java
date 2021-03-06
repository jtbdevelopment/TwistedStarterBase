package com.jtbdevelopment.TwistedStarterBase.rest.services;

import com.jtbdevelopment.TwistedStarterBase.rest.data.GameFeatureInfo;
import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import com.jtbdevelopment.TwistedStarterBase.state.masking.TSBMaskedGame;
import com.jtbdevelopment.games.mongo.players.MongoPlayer;
import com.jtbdevelopment.games.rest.services.AbstractPlayerGatewayService;
import com.jtbdevelopment.games.rest.services.AbstractPlayerServices;
import java.util.List;
import java.util.stream.Collectors;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

/**
 * Date: 11/14/14 Time: 6:36 AM
 */
@Path("/")
@Component
public class TSBPlayerGatewayService extends
    AbstractPlayerGatewayService<ObjectId, GameFeature, TSBGame, TSBMaskedGame, MongoPlayer> {

  TSBPlayerGatewayService(
      final AbstractPlayerServices<ObjectId, GameFeature, TSBGame, TSBMaskedGame, MongoPlayer> playerServices) {
    super(playerServices);
  }

  @GET
  @Path("features")
  @Produces(MediaType.APPLICATION_JSON)
  public List<GameFeatureInfo> featuresAndDescriptions() {
    return GameFeature.getGroupedFeatures().entrySet().stream().map(
        entry ->
            new GameFeatureInfo(
                entry.getKey(),
                entry.getValue()
                    .stream()
                    .map(GameFeatureInfo.Detail::new)
                    .collect(Collectors.toList()))
    ).collect(Collectors.toList());
  }

}
