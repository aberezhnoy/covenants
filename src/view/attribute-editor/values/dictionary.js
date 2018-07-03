import $ from "jquery";

const template = $("#attribute-value-dict").text();

class DictionaryAttributeValue {
    constructor() {
        this.rootElement = $(template);
    }

    destroy() {
        // TODO: implement
    }

    toElement() {
        return this.rootElement;
    }
}

export default DictionaryAttributeValue;
