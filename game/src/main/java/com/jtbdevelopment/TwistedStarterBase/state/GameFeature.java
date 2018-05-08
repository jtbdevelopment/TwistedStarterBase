package com.jtbdevelopment.TwistedStarterBase.state;

import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Date: 7/11/16 Time: 6:57 PM
 */
public enum GameFeature {
  Option1(1, GameFeatureGroupType.Difficulty, "Option 1", "Some sort of option."),
  Choice1(1, "Choice1", "Tada!", Option1),
  Choice2(2, "Two", "Super info!", Option1),
  Choice3(3, "Choice3", "Don\'t pick me.", Option1),
  Option2(1, GameFeatureGroupType.Difficulty, "Option 2", "Some sort of option."),
  Option2Yes(1, "Yes", "Turns on cool feature!", Option2),
  Option2No(2, "No", "Game will suck!", Option2),
  Option3(1, GameFeatureGroupType.MultiPlayer, "Multiplayer Option",
      "Some sort of multi-player option."),
  Solo(1, "Solo", "Make more friends!", Option3),
  Collaborate(2, "Friends", "Play together", Option3),
  Compete(3, "Enemies", "Play head to head.", Option3);

  private static final Map<GameFeature, List<GameFeature>> groupedFeatures = new LinkedHashMap<>();
  private final GameFeatureGroupType groupType;
  private final GameFeature group;
  private final String label;
  private final String description;
  private final int order;

  GameFeature(final int order, final GameFeatureGroupType groupType, final String label,
      final String description) {
    this.order = order;
    this.label = label;
    this.description = description;
    this.group = this;
    this.groupType = groupType;
  }

  GameFeature(final int order, final String label, final String description,
      final GameFeature group) {
    this.order = order;
    this.description = description;
    this.group = group;
    this.label = label;
    this.groupType = group.groupType;
  }

  public static Map<GameFeature, List<GameFeature>> getGroupedFeatures() {
    if (groupedFeatures.isEmpty()) {
      synchronized (groupedFeatures) {
        if (groupedFeatures.isEmpty()) {
          Arrays.stream(values())
              .filter(x -> x.getGroup() == x)
              .forEach(x -> groupedFeatures.put(x, new LinkedList<>()));

          Arrays.stream(values())
              .filter(x -> x.getGroup() != x)
              .forEach(x -> groupedFeatures.get(x.group).add(x));
          groupedFeatures.values().forEach(x -> x.sort(Comparator.comparingInt(o -> o.order)));
        }
      }
    }
    return groupedFeatures;
  }

  public final GameFeatureGroupType getGroupType() {
    return groupType;
  }

  public final GameFeature getGroup() {
    return group;
  }

  public final String getLabel() {
    return label;
  }

  public final String getDescription() {
    return description;
  }

}
