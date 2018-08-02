import { Collection, Model } from "backbone";
import { Value } from "./value";
import { modelIdentifierCode } from "../../model-utils";

const ConditionComponentCollection = Collection.extend({
    model: function(attrs, options) {
        if (attrs.type === "COMPOSITE") {
            return new ConditionCompositeComponent(attrs);
        } else {
            return new ConditionComponent(attrs);
        }
    },

    modelId: modelIdentifierCode
});

class ConditionComponent extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            code: "",
            value: null
        };
    }

    _relations() {
        return {
            value: Value
        }
    }
}

class ConditionCompositeComponent extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            code: "",
            type: "",
            values: []
        };
    }

    _relations() {
        return {
            values: ConditionComponentCollection
        }
    }
}

export {
    ConditionComponentCollection,
    ConditionComponent }