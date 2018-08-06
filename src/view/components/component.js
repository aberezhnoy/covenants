import $ from "jquery";
import { componentValueFactory, componentValueModelFactory } from "../../factories/component-value-factory";
import { bindDictionary, unbindDictionary, bindInputValue, unbindInputValue } from "../../input-data-bind";
import { ValueTypesDict } from "../../dao/dictionaries";
import { ComponentModel } from "../../models/component";
import { destroyRelationModels } from "../../model-utils";

const template = $("#component").text();

class Component {
    constructor() {
        this.model = null;

        this.rootElement = $(template);
        this.valuesElement = this.rootElement.find(".values");
        this.addValueElement = this.rootElement.find(".btn-add-value");
        this.valueTypeElement = this.rootElement.find("[name=valueType]");
        this.nameElement = this.rootElement.find("[name=name]");
        this.codeElement = this.rootElement.find("[name=code]");
        this.templateElement = this.rootElement.find("[name=cdTemplate]");

        bindDictionary(this.valueTypeElement, ValueTypesDict);

        this.addValueElement.click(() => {
            this._addNewComponentValue(this.valueTypeElement.val());
        });

        this.rootElement.find(".remove").click(() => {
            this.model.destroy();
        });
    }

    destroy() {
        unbindDictionary(this.valueTypeElement, ValueTypesDict);

        if (this.model) {
            this._cleanupBindings();
        }

        this.model = null;
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }

    setModel(model) {
        if (!(model instanceof ComponentModel)) {
            throw "error";
        }

        if (this.model) {
            this._cleanupBindings();
        }

        this.model = model;
        this._initBindings();

        // render childs
        this.model
            .get("defaultValues")
            .forEach(this._renderComponentValue, this);
    }

    _initBindings() {
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.templateElement, this.model, "cdTemplate");
        this.model
            .on("destroy", this._onModelDestroy, this);
        this.model
            .get("defaultValues")
            .on("add", this._renderComponentValue, this);
    }

    _cleanupBindings() {
        unbindInputValue(this.nameElement, this.model, "name");
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.templateElement, this.model, "cdTemplate");
        this.model
            .off("destroy", this._onModelDestroy, this);
        this.model
            .get("defaultValues")
            .off("add", this._renderComponentValue, this);
    }

    _addNewComponentValue(type) {
        const componentValueModel = componentValueModelFactory({
            type: type});

        this.model
            .get("defaultValues")
            .add(componentValueModel);
    }

    _onModelDestroy() {
        destroyRelationModels(this.model);
        this.destroy();
    }

    _renderComponentValue(componentValueModel) {
        const componentValueView = componentValueFactory(componentValueModel);
        this.valuesElement.append(componentValueView.toElement());
    }
}

export default Component;