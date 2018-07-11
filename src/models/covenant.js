import { Collection, Model } from "backbone";
import { componentModelFactory } from "../factories/component-factory";

const ComponentCollection = Collection.extend({
    model: function(attrs, options) {
        return componentModelFactory(attrs);
    }
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
    ComponentCollection };
