import $ from "jquery";

const template = $("#attribute-value-amount").text();

class AmountAttributeValue {
    constructor() {
        this.rootElement = $(template);
    }

    destroy() {
        // TODO: implement
    }

    toElement() {
        return this.rootElement;
    }

    toStore() {
        return {};
    }

    fromStore(data) {
        //
    }
}

export default AmountAttributeValue;