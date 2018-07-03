import $ from "jquery";
import { TemplateValueModel } from "../../models/attribute-value";
import GlobalEvents from "../../events";
import {bindDictionary, bindInputValue, unbindDictionary} from "../../input-data-bind";
import { TemplateValueTypesDict } from "../../dao/dictionaries";
import { attributeEditorInst } from "../attribute-editor/editor";

const template = $("#value-template").text();

class ValueTemplate {
    constructor() {
        this.model = new TemplateValueModel();
        //this.templateValues = [];
        this.parent = null;

        this.rootElement = $(template);
        this.codeElement = this.rootElement.find("[name=code]");
        this.nameElement = this.rootElement.find("[name=name]");
        this.templateElement = this.rootElement.find("[name=template]");
        this.typeElement = this.rootElement.find(".xxx");

        bindDictionary(this.typeElement, TemplateValueTypesDict);
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.templateElement, this.model, "template");

        this.rootElement.find(".show-attribute-editor").click(() => {
            attributeEditorInst.setDoneCallback(() => {
                const attrs = attributeEditorInst.toStore();
                this.model.set("attributes", attrs);
            });
        });

        this.rootElement.find(".remove").click(() => {
            this.destroy();
        });
    }

    destroy() {
        unbindDictionary(this.typeElement, TemplateValueTypesDict);
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
}

export default ValueTemplate;
