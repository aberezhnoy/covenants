import { Collection, Model } from "backbone";
import { Dictionary } from "./dictionary";
import { _ } from "underscore";

const ValueAttributeCollection = Collection.extend({
    model: function(attrs, options) {
        const modelConstr = valueAttributeModelTypes[attrs.type];
        return new modelConstr(attrs, options);
    },

    modelId: function(attrs) {
        return attrs.key;
    }
});

class BaseValueAttributeModel extends Model {
    idAttribute() {
        return "key";
    }

    defaults() {
        return {
            key: "",
            type: ""
        };
    }

    getType() {
        return this.get("type");
    }
}

const TYPE_SCALAR = "SCALAR";

class ScalarValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            ...super.defaults(),
            type: TYPE_SCALAR,
            default: null
        };
    }
}

const TYPE_PERCENTAGE = "PERCENTAGE";

class PercentageValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            ...super.defaults(),
            type: TYPE_PERCENTAGE,
            default: 0
        };
    }
}

const TYPE_DATE = "DATE";

class DateValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            ...super.defaults(),
            type: TYPE_DATE,
            default: new Date()
        };
    }
}

const TYPE_DICT = "DICT";

class DictionaryValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            ...super.defaults(),
            type: TYPE_DICT,
            dict: ""
        };
    }
}

const TYPE_AMOUNT = "AMOUNT";

class AmountValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            ...super.defaults(),
            type: TYPE_AMOUNT,
            amount: 0.0,
            currency: "RUR"
        };
    }
}

const valueAttributeModelTypes = {
    [TYPE_SCALAR]: ScalarValueAttributeModel,
    [TYPE_PERCENTAGE]: PercentageValueAttributeModel,
    [TYPE_DATE]: DateValueAttributeModel,
    [TYPE_DICT]: DictionaryValueAttributeModel,
    [TYPE_AMOUNT]: AmountValueAttributeModel };

const ValueAttributeModelTypesDict = new Dictionary(
    _.keys(valueAttributeModelTypes)
    .map((type) => {
        return {
            title: type,
            value: type }}));

export {
    ValueAttributeCollection,
    ValueAttributeModelTypesDict,

    AmountValueAttributeModel,
    ScalarValueAttributeModel,
    PercentageValueAttributeModel,
    DateValueAttributeModel,
    DictionaryValueAttributeModel,

    TYPE_DICT,
    TYPE_DATE,
    TYPE_PERCENTAGE,
    TYPE_SCALAR,
    TYPE_AMOUNT,

    valueAttributeModelTypes};
