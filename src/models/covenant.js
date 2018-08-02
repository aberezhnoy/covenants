import { Collection, Model } from "backbone";
import { componentModelFactory } from "../factories/component-factory";
import { covenantModelFactory } from "../factories/covenant-factory";
import { modelIdentifierCode } from "../model-utils";

const ComponentCollection = Collection.extend({
    model: function(attrs, options) {
        return componentModelFactory(attrs);
    },

    modelId: modelIdentifierCode
});

const CovenantCollection = Collection.extend({
    model: function(attrs, options) {
        return covenantModelFactory(attrs);
    },

    modelId: modelIdentifierCode
});

class CovenantModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            type: "",
            required: "NOT_REQUIRED",
            cdTemplate: "",
            components: []
        };
    }

    _relations() {
        return {
            components: ComponentCollection
        }
    }
}

export {
    CovenantModel,
    ComponentCollection,
    CovenantCollection };

