import $ from "jquery";
import { ComponentTemplateValueModel } from "../../models/component-value";
import { bindInputValue, unbindInputValue } from "../../input-data-bind";
import { attributeEditorInst } from "../attribute-editor/editor";
import {destroyRelationModels} from "../../model-utils";

const template = $("#value-template").text();

class ValueTemplate {
    constructor() {
        this.model = null;

        this.rootElement = $(template);
        this.codeElement = this.rootElement.find("[name=code]");
        this.nameElement = this.rootElement.find("[name=name]");
        this.templateElement = this.rootElement.find("[name=template]");

        this.rootElement.find(".show-attribute-editor").click(() => {
            this._showAttributeEditor();
        });

        this.rootElement.find(".remove").click(() => {
            this.model.destroy();
        });
    }

    destroy() {
        this._cleanupBindings();
        this.model = null;
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }

    setModel(model) {
        if (!(model instanceof ComponentTemplateValueModel)) {
            throw "type error";
        }

        if (this.model) {
            this._cleanupBindings();
        }

        this.model = model;
        this._initBindings();
    }

    _showAttributeEditor() {
        attributeEditorInst.setDoneCallback(() => {
            attributeEditorInst.setDoneCallback(null);
            attributeEditorInst.setModel(null);
        });
        attributeEditorInst.setModel(this.model.get("attributes"));
        attributeEditorInst.show();
    }

    _initBindings() {
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.templateElement, this.model, "cdTemplate");
        this.model.on("destroy", this._onModelDestroy, this);
    }

    _cleanupBindings() {
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.nameElement, this.model, "name");
        unbindInputValue(this.templateElement, this.model, "cdTemplate");
        this.model.off("destroy", this._onModelDestroy, this);
    }

    _onModelDestroy() {
        destroyRelationModels(this.model);
        this.destroy();
    }
}

export default ValueTemplate;
