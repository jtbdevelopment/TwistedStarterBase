package com.jtbdevelopment.TwistedStarterBase.rest.data;

import com.jtbdevelopment.TwistedStarterBase.state.GameFeature;
import com.jtbdevelopment.TwistedStarterBase.state.GameFeatureGroupType;
import java.util.ArrayList;
import java.util.List;

/**
 * Date: 4/28/15 Time: 6:54 PM
 */
@SuppressWarnings({"unused", "WeakerAccess"})
public class GameFeatureInfo {

  private Detail feature;
  private List<Detail> options = new ArrayList<>();

  public GameFeatureInfo() {
  }

  public GameFeatureInfo(final GameFeature feature, final List<Detail> options) {
    this.feature = new Detail(feature);
    this.options.addAll(options);
  }

  public boolean equals(final Object o) {
    if (this == o) {
      return true;
    }
    if (!getClass().equals(o.getClass())) {
      return false;
    }

    final GameFeatureInfo that = (GameFeatureInfo) o;

    return options.equals(that.options) && feature.equals(that.feature);
  }

  public int hashCode() {
    return feature.hashCode();
  }

  public Detail getFeature() {
    return feature;
  }

  public void setFeature(Detail feature) {
    this.feature = feature;
  }

  public List<Detail> getOptions() {
    return options;
  }

  public void setOptions(List<Detail> options) {
    this.options = options;
  }

  public static class Detail {

    private GameFeatureGroupType groupType;
    private GameFeature feature;
    private GameFeature group;
    private String label;
    private String description;

    public Detail() {
    }

    public Detail(final GameFeature feature) {
      this.feature = feature;
      this.description = feature.getDescription();
      this.label = feature.getLabel();
      this.groupType = feature.getGroupType();
      this.group = feature.getGroup();
    }

    public boolean equals(final Object o) {
      if (this == o) {
        return true;
      }
      if (!getClass().equals(o.getClass())) {
        return false;
      }

      final Detail detail = (Detail) o;

      return feature.equals(detail.feature);
    }

    public int hashCode() {
      return feature.hashCode();
    }

    public GameFeatureGroupType getGroupType() {
      return groupType;
    }

    public void setGroupType(GameFeatureGroupType groupType) {
      this.groupType = groupType;
    }

    public GameFeature getFeature() {
      return feature;
    }

    public void setFeature(GameFeature feature) {
      this.feature = feature;
    }

    public GameFeature getGroup() {
      return group;
    }

    public void setGroup(GameFeature group) {
      this.group = group;
    }

    public String getLabel() {
      return label;
    }

    public void setLabel(String label) {
      this.label = label;
    }

    public String getDescription() {
      return description;
    }

    public void setDescription(String description) {
      this.description = description;
    }
  }
}
