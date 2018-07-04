import { Model } from "backbone";
import { ValueAttributeCollection } from "./attribute-value";

class TemplateValueModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            template: "",
            attributes: [],
            type: "TEMPLATE"
        };
    }

    _relations() {
        return {
            attributes: ValueAttributeCollection
        }
    }
}

export default TemplateValueModel;