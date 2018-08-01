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
    }
});

class Value extends Model {
    defaults() {
        return {
            type: "",
            value: "",
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
