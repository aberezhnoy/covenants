import $ from "jquery";
import { PercentageValueAttributeModel } from "../../../models/attribute-value";
import { bindInputValue, unbindInputValue } from "../../../input-data-bind";

const template = $("#attribute-value-percentage").text();

class PercentageAttributeValue {
    constructor(model) {
        if (!(model instanceof PercentageValueAttributeModel)) {
            throw "Model is not of type PercentageValueAttributeModel";
        }
        this.model = model;

        this.rootElement = $(template);
        this.percentageElement = this.rootElement.find(".percentage-value");

        bindInputValue(this.percentageElement, this.model, "default");
    }

    destroy() {
        unbindInputValue(this.percentageElement, this.model, "default");
        this.model = null;
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }
}

export default PercentageAttributeValue;
