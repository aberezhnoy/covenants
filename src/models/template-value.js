import { Collection, Model } from "backbone";

class TemplateValueModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            template: "",
            attributes: []
        };
    }
}

class TemplateValueAttributesCollection extends Collection {
    model(attrs, options) {
        const modelConstr = valueAttributeModelTypes[attrs.type];
        return new modelConstr(attrs, options);
    }
}

class BaseValueAttributeModel extends Model {
    get idAttribute() {
        return "key";
    }

    defaults() {
        return {
            key: "",
            type: ""
        };
    }
}

class ScalarValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            type: "SCALAR",
            default: null,
            ...super.defaults()
        };
    }
}

class PercentageValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            type: "PERCENTAGE",
            default: 0,
            ...super.defaults()
        };
    }
}

class DateValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            type: "DATE",
            default: new Date(),
            ...super.defaults()
        };
    }
}

class DictionaryValueAttributeModel extends BaseValueAttributeModel {
    defaults() {
        return {
            type: "DICT",
            default: "",
            dict: "",
            ...super.defaults()
        };
    }
}

const valueAttributeModelTypes = {
    "SCALAR": ScalarValueAttributeModel,
    "PERCENTAGE": PercentageValueAttributeModel,
    "DATE": DateValueAttributeModel,
    "DICT": DictionaryValueAttributeModel };

export {
    TemplateValueModel,
    TemplateValueAttributesCollection };
