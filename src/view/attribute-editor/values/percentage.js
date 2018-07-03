import $ from "jquery";

const template = $("#attribute-value-percentage").text();

class PercentageAttributeValue {
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

export default PercentageAttributeValue;
