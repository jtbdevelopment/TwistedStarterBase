package com.jtbdevelopment.TwistedStarterBase.factory.validators;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.TSBGame;
import org.junit.Test;

import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

/**
 * Date: 4/20/15
 * Time: 6:49 PM
 */
public class OptionsValidatorTest {
    private OptionsValidator validator = new OptionsValidator();

    @Test
    public void testGameFailsIfMissingAnOptionFromAGroup() {
        final Random random = new Random();
        GameFeature.getGroupedFeatures().forEach((groupToSkip, optionsToSkip) -> {
            Set<GameFeature> gameFeatures = GameFeature.getGroupedFeatures()
                    .entrySet()
                    .stream()
                    .filter(e -> groupToSkip != e.getKey())
                    .map(Map.Entry::getValue)
                    .map(o -> o.get(random.nextInt(o.size() - 1)))
                    .collect(Collectors.toSet());
            TSBGame game = new TSBGame();
            game.setFeatures(gameFeatures);
            assertFalse(validator.validateGame(game));
        });
    }

    @Test
    public void testGameFailsIfUsingGroupingOptions() {
        final Random random = new Random();
        GameFeature.getGroupedFeatures().forEach((groupToUse, optionsToSkip) -> {
            Set<GameFeature> gameFeatures = GameFeature.getGroupedFeatures()
                    .entrySet()
                    .stream()
                    .filter(e -> groupToUse != e.getKey())
                    .map(Map.Entry::getValue)
                    .map(o -> o.get(random.nextInt(o.size() - 1)))
                    .collect(Collectors.toSet());
            gameFeatures.add(groupToUse);
            TSBGame game = new TSBGame();
            game.setFeatures(gameFeatures);
            assertFalse(validator.validateGame(game));
        });
    }

    @Test
    public void testGameFailsIfOneGroupHasMultipleOptionsFromOneGroup() {
        GameFeature.getGroupedFeatures().forEach((groupToDouble, optionsToDouble) -> {
            Set<GameFeature> gameFeatures = GameFeature.getGroupedFeatures()
                    .entrySet()
                    .stream()
                    .map(Map.Entry::getValue)
                    .map(o -> o.get(0))
                    .collect(Collectors.toSet());
            gameFeatures.add(optionsToDouble.get(1));
            TSBGame game = new TSBGame();
            game.setFeatures(gameFeatures);
            assertFalse(validator.validateGame(game));
        });
    }

    @Test
    public void testAValidGame() {
        final Random random = new Random();
        Set<GameFeature> gameFeatures = GameFeature.getGroupedFeatures()
                .entrySet()
                .stream()
                .map(Map.Entry::getValue)
                .map(o -> o.get(random.nextInt(o.size() - 1)))
                .collect(Collectors.toSet());
        TSBGame game = new TSBGame();
        game.setFeatures(gameFeatures);
        assertTrue(validator.validateGame(game));
    }

    @Test
    public void testErrorMessage() {
        assertEquals("Invalid combination of options!", validator.errorMessage());
    }
}
