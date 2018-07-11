import $ from "jquery";
import { CovenantModel } from "../models/covenant";
import {
    bindDictionary,
    bindInputValue,
    unbindDictionary,
    unbindInputValue
} from "../input-data-bind";
import { CovenantsRequiredDict } from "../dao/dictionaries";
import { destroyRelationModels } from "../model-utils";
import ComponentList from "./components/component-list";

const template = $("#covenant").text();

class Covenant {
    constructor() {
        this.model = null;

        this.componentListView = new ComponentList();
        this.componentListView.toElement().appendTo(".layout.default .component-list-container");

        this.rootElement = $(template);
        this.nameElement = this.rootElement.find("[name=name]");
        this.codeElement = this.rootElement.find("[name=code]");
        this.requiredElement = this.rootElement.find("[name=required]");
        this.cdTemplate = this.rootElement.find("[name=cdTemplate]");

        bindDictionary(this.requiredElement, CovenantsRequiredDict);
    }

    destroy() {
        unbindDictionary(this.requiredElement, CovenantsRequiredDict);
        this._cleanupBindings();
        this.model = null;
        this.componentListView.destroy();
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }

    setModel(model) {
        if (!(model instanceof CovenantModel)) {
            throw "type error";
        }

        if (this.model) {
            this._cleanupBindings();
        }

        this.model = model;
        this._initBindings();
        this.componentListView.setModel(this.model.get("components"));
    }

    _initBindings() {
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.requiredElement, this.model, "required");
        bindInputValue(this.cdTemplate, this.model, "cdTemplate");
        this.model.on("destroy", this._onModelDestroy, this);
    }

    _cleanupBindings() {
        unbindInputValue(this.nameElement, this.model, "name");
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.requiredElement, this.model, "required");
        unbindInputValue(this.cdTemplate, this.model, "cdTemplate");
        this.model.off("destroy", this._onModelDestroy, this);
    }

    _onModelDestroy() {
        destroyRelationModels(this.model);
        this.destroy();
    }
}

export default Covenant;
