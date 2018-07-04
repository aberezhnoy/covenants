import $ from "jquery";

const template = $("#value-composite").text();

class ValueComposite {
    constructor() {
        this.model = null;

        this.rootElement = $(template);
    }

    destroy() {

    }

    toStore() {
        return this.model.toJSON();
    }

    fromStore(data) {
        this.model.set(data);
    }

    toElement() {
        return this.rootElement;
    }

    setParent(parent) {
        this.parent = parent;
    }
}

export default ValueComposite;
