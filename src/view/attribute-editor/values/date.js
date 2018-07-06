import $ from "jquery";
import { DateValueAttributeModel } from "../../../models/attribute-value";
import { bindInputValue, unbindInputValue } from "../../../input-data-bind";

const template = $("#attribute-value-date").text();

class DateAttributeValue {
    constructor(model) {
        if (!(model instanceof DateValueAttributeModel)) {
            throw "error";
        }

        this.model = model;

        this.rootElement = $(template);
        this.dateElement = this.rootElement.find(".date-value");

        //bindInputValue(this.dateElement, this.model, "default");
    }

    destroy() {
        this.model = null;
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }
}

export default DateAttributeValue;
