import $ from "jquery";
import { ScalarValueAttributeModel } from "../../../models/attribute-value";
import { bindInputValue, unbindInputValue } from "../../../input-data-bind";

const template = $("#attribute-value-scalar").text();

class ScalarAttributeValue {
    constructor(model) {
        if (!(model instanceof ScalarValueAttributeModel)) {
            throw "Model is not of type ScalarValueAttributeModel";
        }

        this.model = model;
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
}

export default ScalarAttributeValue;
