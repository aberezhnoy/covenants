import $ from "jquery";
import { bindInputValue, unbindInputValue } from "../../input-data-bind";
import { destroyRelationModels } from "../../model-utils";
import { CompositeComponentModel } from "../../models/component";

const template = $("#composite-component").text();

class CompositeComponent {
    constructor() {
        this.model = null;

        this.rootElement = $(template);
        this.codeElement = this.rootElement.find("[name=code]");
        this.nameElement = this.rootElement.find("[name=name]");
        this.childsTextElement = this.rootElement.find("[name=childsText]");

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
        if (!(model instanceof CompositeComponentModel)) {
            throw "type error";
        }

        if (this.model) {
            this._cleanupBindings();
        }

        this.model = model;
        this._initBindings();
    }

    _initBindings() {
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.childsTextElement, this.model, "childsText");
        this.model.on("destroy", this._onModelDestroy, this);
    }

    _cleanupBindings() {
        unbindInputValue(this.nameElement, this.model, "name");
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.childsTextElement, this.model, "childsText");
        this.model.off("destroy", this._onModelDestroy, this);
    }

    _onModelDestroy() {
        destroyRelationModels(this.model);
        this.destroy();
    }
}

export default CompositeComponent;