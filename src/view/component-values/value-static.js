import $ from "jquery";
import { ComponentStaticValueModel } from "../../models/component-value";
import { bindInputValue, unbindInputValue } from "../../input-data-bind";
import { destroyRelationModels } from "../../model-utils";

const template = $("#value-static").text();

class ValueStatic {
    constructor() {
        this.model = null;

        this.rootElement = $(template);
        this.codeElement = this.rootElement.find("[name=code]");
        this.nameElement = this.rootElement.find("[name=name]");
        this.cdTemplateElement = this.rootElement.find("[name=cdTemplate]");
        this.oTemplateElement = this.rootElement.find("[name=oTemplate]");

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
        if (!(model instanceof ComponentStaticValueModel)) {
            throw "type error";
        }

        if (this.model) {
            this._cleanupBindings();
        }

        this.model = model;
        this._initBindings();
    }

    _initBindings() {
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.cdTemplateElement, this.model, "cdTemplate");
        bindInputValue(this.oTemplateElement, this.model, "oTemplate");
        this.model.on("destroy", this._onModelDestroy, this);
    }

    _cleanupBindings() {
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.nameElement, this.model, "name");
        unbindInputValue(this.cdTemplateElement, this.model, "cdTemplate");
        unbindInputValue(this.oTemplateElement, this.model, "oTemplate");
        this.model.off("destroy", this._onModelDestroy, this);
    }

    _onModelDestroy() {
        destroyRelationModels(this.model);
        this.destroy();
    }
}

export default ValueStatic;
