import $ from "jquery";
import { DictionaryValueAttributeModel } from "../../../models/attribute-value";
import {bindDictionary, bindInputValue, unbindDictionary, unbindInputValue} from "../../../input-data-bind";
import { ExternalDictionariesDict } from "../../../dao/dictionaries";

const template = $("#attribute-value-dict").text();

class DictionaryAttributeValue {
    constructor(model) {
        if (!(model instanceof DictionaryValueAttributeModel)) {
            throw "error";
        }

        this.model = model;

        this.rootElement = $(template);
        this.dictionaryElement = this.rootElement.find(".dictionary");

        bindDictionary(this.dictionaryElement, ExternalDictionariesDict);
        bindInputValue(this.dictionaryElement, this.model, "dict");
    }

    destroy() {
        unbindDictionary(this.dictionaryElement, ExternalDictionariesDict);
        unbindInputValue(this.dictionaryElement, this.model, "dict");
    }

    toElement() {
        return this.rootElement;
    }
}

export default DictionaryAttributeValue;
