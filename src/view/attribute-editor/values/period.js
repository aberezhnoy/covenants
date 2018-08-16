import $ from "jquery";
import { bindInputValue, unbindInputValue, bindDictionary, unbindDictionary } from "../../../input-data-bind";
import { PeriodValueAttributeModel } from "../../../models/attribute-value";
import { getExternalDictionary } from "../../../dao/dictionaries";

const template = $("#attribute-value-period").text();
const PeriodUnitDict = getExternalDictionary("PERIOD_UNIT");

class PeriodAttributeValue {
    constructor(model) {
        if (!(model instanceof PeriodValueAttributeModel)) {
            throw "Model is not of type PeriodValueAttributeModel";
        }

        this.model = model;
        this.rootElement = $(template);
        this.periodInputElement = this.rootElement.find(".period");
        this.unitInputElement = this.rootElement.find(".unit");

        bindDictionary(this.unitInputElement, PeriodUnitDict);
        bindInputValue(this.periodInputElement, this.model, "period", "int");
    }

    destroy() {
        unbindDictionary(this.unitInputElement, PeriodUnitDict);
        unbindInputValue(this.periodInputElement, this.model, "period");
        this.model = null;
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }
}

export default PeriodAttributeValue;
