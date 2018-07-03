import $ from "jquery";
import { AmountValueAttributeModel } from "../../../models/attribute-value";
import {
    bindDictionary,
    bindInputValue,
    unbindDictionary,
    unbindInputValue } from "../../../input-data-bind";
import { getExternalDictionary } from "../../../dao/dictionaries";

const template = $("#attribute-value-amount").text();
const CurrencyDict = getExternalDictionary("CURRENCY");

class AmountAttributeValue {
    constructor(model) {
        this.model = model || new AmountValueAttributeModel();

        this.rootElement = $(template);
        this.amountElement = this.rootElement.find(".amount");
        this.currencyElement = this.rootElement.find(".currency");

        bindDictionary(this.currencyElement, CurrencyDict);
        bindInputValue(this.amountElement, this.model, "amount");
        bindInputValue(this.currencyElement, this.model, "currency");
    }

    destroy() {
        unbindDictionary(this.currencyElement, CurrencyDict);
        unbindInputValue(this.amountElement, "amount");
        unbindInputValue(this.currencyElement, "currency");
        this.model = null;
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }
}

export default AmountAttributeValue;