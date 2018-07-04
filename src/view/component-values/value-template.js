import $ from "jquery";
import TemplateValueModel from "../../models/template-value";
import GlobalEvents from "../../events";
import { bindInputValue, unbindInputValue } from "../../input-data-bind";
import { attributeEditorInst } from "../attribute-editor/editor";

const template = $("#value-template").text();

class ValueTemplate {
    constructor() {
        this.model = new TemplateValueModel();
        this.parent = null;

        this.rootElement = $(template);
        this.codeElement = this.rootElement.find("[name=code]");
        this.nameElement = this.rootElement.find("[name=name]");
        this.templateElement = this.rootElement.find("[name=template]");

        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.templateElement, this.model, "template");

        this.rootElement.find(".show-attribute-editor").click(() => {
            this._showAttributeEditor();
        });

        this.rootElement.find(".remove").click(() => {
            this.destroy();
        });
    }

    destroy() {
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.nameElement, this.model, "name");
        unbindInputValue(this.templateElement, this.model, "template");
        this.model.off();
        this.rootElement.remove();

        GlobalEvents.trigger("component-value:destroyed", {
            parent: this.parent,
            target: this });
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

    _showAttributeEditor() {
        attributeEditorInst.setDoneCallback(() => {
            const attrs = attributeEditorInst.toStore();
            this.model.set("attributes", attrs);
            attributeEditorInst.setDoneCallback(null);
        });
        attributeEditorInst.fromStore(this.model.get("attributes"));
        attributeEditorInst.show();
    }
}

export default ValueTemplate;
