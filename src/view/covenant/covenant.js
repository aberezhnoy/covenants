import $ from "jquery";
import { CovenantModel } from "../../models/covenant";
import {
    bindDictionary,
    bindInputValue,
    unbindDictionary,
    unbindInputValue
} from "../../input-data-bind";
import { CovenantsRequiredDict } from "../../dao/dictionaries";
import { destroyRelationModels } from "../../model-utils";
import { componentListView } from "../views";

const template = $("#covenant").text();

class Covenant {
    constructor() {
        this.model = null;

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
        componentListView.clear();
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
        componentListView.setModel(this.model.get("components"));
    }

    _initBindings() {
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.requiredElement, this.model, "required");
        bindInputValue(this.cdTemplate, this.model, "cdTemplate");
        this.model.on("destroy", this._onModelDestroy, this);
    }

    _cleanupBindings() {
        unbindInputValue(this.nameElement, this.model, "name");
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
