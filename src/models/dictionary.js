import { Model, Collection } from "backbone";
import {ValueAttribute} from "../client/models/value";

class DictItem extends Model {
    get idAttribute() {
        return "value";
    }

    defaults() {
        return {
            title: "",
            value: ""
        };
    }
}


const Dictionary = Collection.extend({
    model: function(attrs, options) {
        return new DictItem(attrs);
    },

    modelId: function(attr) {
        return attr.value;
    }
});

export {
    Dictionary,
    DictItem };
