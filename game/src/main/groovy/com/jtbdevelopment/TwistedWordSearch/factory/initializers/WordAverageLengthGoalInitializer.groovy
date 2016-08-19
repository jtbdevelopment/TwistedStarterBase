package com.jtbdevelopment.TwistedWordSearch.factory.initializers

import com.jtbdevelopment.TwistedWordSearch.state.GameFeature
import com.jtbdevelopment.TwistedWordSearch.state.TWSGame
import com.jtbdevelopment.games.factory.GameInitializer
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Date: 8/16/16
 * Time: 6:56 AM
 */
@Component
@CompileStatic
class WordAverageLengthGoalInitializer implements GameInitializer<TWSGame> {
    private static final Map<GameFeature, Integer> WORD_LENGTHS = [
            (GameFeature.BeginnerDifficulty)    : 10,
            (GameFeature.ExperiencedDifficulty) : 8,
            (GameFeature.ExpertDifficulty)      : 7,
            (GameFeature.ProfessionalDifficulty): 6,
    ]

    void initializeGame(final TWSGame game) {
        GameFeature difficulty = game.features.find { it.group == GameFeature.WordDifficulty }
        game.wordAverageLengthGoal = WORD_LENGTHS[difficulty]
    }

    int getOrder() {
        return DEFAULT_ORDER - 20
    }
}
