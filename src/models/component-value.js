import { Model } from "backbone";
import { ValueAttributeCollection } from "./attribute-value";

const COMPONENT_VALUE_STATIC = "STATIC";
const COMPONENT_VALUE_TEMPLATE = "TEMPLATE";

class ComponentStaticValueModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            cdTemplate: "",
            oTemplate: "",
            type: COMPONENT_VALUE_STATIC
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
            cdTemplate: "",
            oTemplate: "",
            attributes: [],
            type: COMPONENT_VALUE_TEMPLATE
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
    ComponentTemplateValueModel,
    COMPONENT_VALUE_STATIC,
    COMPONENT_VALUE_TEMPLATE };
