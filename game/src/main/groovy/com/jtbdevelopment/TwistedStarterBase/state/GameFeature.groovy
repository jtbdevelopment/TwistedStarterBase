package com.jtbdevelopment.TwistedStarterBase.state

import groovy.transform.CompileStatic

/**
 * Date: 7/11/16
 * Time: 6:57 PM
 */
@CompileStatic
enum GameFeature {
    //  TODO - real options
    Option1(1, GameFeatureGroupType.Difficulty, 'Option 1', 'Some sort of option.'),
    Choice1(1, 'Choice1', 'Tada!', Option1),
    Choice2(2, 'Two', 'Super info!', Option1),
    Choice3(3, 'Choice3', 'Don\'t pick me.', Option1),

    Option2(1, GameFeatureGroupType.Difficulty, 'Option 2', 'Some sort of option.'),
    Option2Yes(1, 'Yes', 'Turns on cool feature!', Option2),
    Option2No(2, 'No', 'Game will suck!', Option2),

    Option3(1, GameFeatureGroupType.MultiPlayer, 'Multiplayer Option', 'Some sort of multi-player option.'),
    Solo(1, 'Solo', 'Make more friends!', Option3),
    Collaborate(2, 'Friends', 'Play together', Option3),
    Compete(3, 'Enemies', 'Play head to head.', Option3),

    final GameFeatureGroupType groupType
    final GameFeature group
    final String label
    final String description
    final int order

    //  Constructor for groups
    public GameFeature(
            final int order,
            final GameFeatureGroupType groupType,
            final String label,
            final String description
    ) {
        this.order = order
        this.label = label
        this.description = description
        this.group = this
        this.groupType = groupType
    }

    public GameFeature(
            final int order,
            final String label,
            final String description,
            final GameFeature group
    ) {
        this.order = order
        this.description = description
        this.group = group
        this.label = label
        this.groupType = group.groupType
    }

    static final Map<GameFeature, List<GameFeature>> groupedFeatures = [:]
    static {
        values().findAll {
            GameFeature it ->
                it.group == it
        }.each {
            GameFeature it ->
                groupedFeatures.put(it, [])
        }

        values().findAll {
            GameFeature it ->
                it.group != it
        }.each {
            GameFeature it ->
                groupedFeatures[it.group].add(it)
        }

        groupedFeatures.values().each {
            List<GameFeature> o ->
                o.sort { GameFeature a, GameFeature b -> a.order.compareTo(b.order) }
        }
    }
}