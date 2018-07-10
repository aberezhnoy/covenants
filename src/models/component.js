import { Collection, Model } from "backbone";
import { componentValueModelFactory } from "../factories/component-value-factory";

const ComponentValuesCollection = Collection.extend({
    model: function(attrs, options) {
        return componentValueModelFactory(attrs);
    }
});

class ComponentModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            code: "",
            name: "",
            defaultValues: [],
            type: "STD"
        };
    }

    _relations() {
        return {
            defaultValues: ComponentValuesCollection
        }
    }

    getType() {
        return this.get("type");
    }
}

export default ComponentModel;
