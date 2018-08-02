import { Collection, Model } from "backbone";

class ValueAttribute extends Model {
    defaults() {
        return {
            key: "",
            type: "",
            value: null
        };
    }
}

const ValueAttributeCollection = Collection.extend({
    model: function(attrs, options) {
        return new ValueAttribute(attrs);
    },

    modelId: function(attr) {
        return attr.key;
    }
});

class Value extends Model {
    defaults() {
        return {
            type: "",
            value: null,
            attributes: []
        };
    }

    _relations() {
        return {
            attributes: ValueAttributeCollection
        }
    }
}

export {
    ValueAttribute,
    ValueAttributeCollection,
    Value };
