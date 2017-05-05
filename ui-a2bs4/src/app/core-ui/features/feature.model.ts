import {FeatureOption} from './feature-option.model';
export class Feature {
    public feature: string;
    public groupType: string;
    public label: string;
    public description: string;
    public options: FeatureOption[] = [];

    constructor(feature: string, groupType: string, label: string, description: string) {
        this.feature = feature;
        this.groupType = groupType;
        this.description = description;
        this.label = label;
    }
}
