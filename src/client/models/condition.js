import { Collection, Model } from "backbone";
import { ConditionComponentCollection } from "./condition-component";
import { modelIdentifierCode } from "../../model-utils";

const ConditionCollection = Collection.extend({
    model: function(attrs, options) {
        return new ConditionModel(attrs);
    },

    modelId: modelIdentifierCode
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

if (window) {
    window._cov = window._cov || {};
    window._cov.ConditionModel = ConditionModel;
}

export {
    ConditionCollection,
    ConditionModel }