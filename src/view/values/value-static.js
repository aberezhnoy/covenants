import $ from "jquery";
import StaticValueModel from "../../models/static-value";
import GlobalEvents from "../../events";
import { bindInputValue } from "../../input-data-bind";

const template = $("#value-static").text();

class ValueStatic {
    constructor() {
        this.model = new StaticValueModel();
        this.parent = null;

        this.rootElement = $(template);
        this.codeElement = this.rootElement.find("[name=code]");
        this.nameElement = this.rootElement.find("[name=name]");

        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.nameElement, this.model, "name");

        this.rootElement.find(".remove").click(() => {
            this.destroy();
        });
    }

    destroy() {
        this.model.off();
        this.rootElement.remove();
        GlobalEvents.trigger("component-value:destroyed", {
            parent: this.parent,
            target: this
        });
    }

    toStore() {
        return this.model.toJSON();
    }

    toElement() {
        return this.rootElement;
    }

    setParent(parent) {
        this.parent = parent;
    }
}

export default ValueStatic;
