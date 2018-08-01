import { Collection, Model } from "backbone";
import { ConditionComponentCollection } from "./condition-component";

const ConditionCollection = Collection.extend({
    model: function(attrs, options) {
        return new ConditionModel(attrs);
    }
});

class ConditionModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            code: "",
            components: []
        };
    }

    _relations() {
        return {
            components: ConditionComponentCollection
        }
    }
}

export {
    ConditionCollection,
    ConditionModel }