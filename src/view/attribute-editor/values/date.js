import $ from "jquery";

const template = $("#attribute-value-date").text();

class DateAttributeValue {
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

export default DateAttributeValue;
