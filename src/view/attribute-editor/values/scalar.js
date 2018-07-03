import $ from "jquery";
import { ScalarValueAttributeModel } from "../../../models/attribute-value";
import { bindInputValue, unbindInputValue } from "../../../input-data-bind";

const template = $("#attribute-value-scalar").text();

class ScalarAttributeValue {
    constructor(model) {
        this.model = model || new ScalarValueAttributeModel();
        this.rootElement = $(template);
        this.valueElement = this.rootElement.find(".scalar-value");

        bindInputValue(this.valueElement, this.model, "default");
    }

    destroy() {
        unbindInputValue(this.valueElement, this.model, "default");
        this.model = null;
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }

    toStore() {
        return this.model.toJSON();
    }

    fromStore(data) {
        this.model.set(data);
    }
}

export default ScalarAttributeValue;
