package com.jtbdevelopment.TwistedStarterBase.factory.validators;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import com.jtbdevelopment.games.factory.GameValidator;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Date: 4/20/15
 * Time: 6:48 PM
 */
@Component
public class OptionsValidator implements GameValidator<TSBGame> {
    @Override
    public boolean validateGame(final TSBGame game) {
        Optional<GameFeature> invalidFeature = game.getFeatures().stream().filter(x -> x.getGroup() == x).findFirst();
        if (invalidFeature.isPresent()) {
            return false;
        }

        Map<GameFeature, GameFeature> groupToFeature = game.getFeatures()
                .stream()
                .collect(Collectors.toMap(GameFeature::getGroup, x -> x, (a, b) -> a));
        return groupToFeature.size() == GameFeature.getGroupedFeatures().size() && groupToFeature.size() == game.getFeatures().size();
    }

    @Override
    public String errorMessage() {
        return "Invalid combination of options!";
    }

}
