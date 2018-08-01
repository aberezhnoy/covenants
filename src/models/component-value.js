import { Model } from "backbone";
import { ValueAttributeCollection } from "./attribute-value";

class ComponentStaticValueModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            cdTemplate: "",
            type: "STATIC"
        };
    }

    getType() {
        return this.get("type");
    }
}

class ComponentTemplateValueModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            template: "", // TODO: remove
            cdTemplate: "",
            attributes: [],
            type: "TEMPLATE"
        };
    }

    _relations() {
        return {
            attributes: ValueAttributeCollection
        }
    }

    getType() {
        return this.get("type");
    }
}

export {
    ComponentStaticValueModel,
    ComponentTemplateValueModel };
