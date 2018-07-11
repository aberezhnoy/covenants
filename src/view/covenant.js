import $ from "jquery";
import CovenantModel from "../models/covenant";
import {
    bindDictionary,
    bindInputValue,
    unbindInputValue } from "../input-data-bind";
import { CovenantsRequiredDict, ComponentTypesDict } from "../dao/dictionaries";
import { componentFactory, componentModelFactory } from "../factories/component-factory";
import {destroyRelationModels} from "../model-utils";

const template = $("#covenant").text();

class Covenant {
    constructor() {
        this.model = null;

        this.rootElement = $(template);
        this.nameElement = this.rootElement.find("[name=name]");
        this.codeElement = this.rootElement.find("[name=code]");
        this.requiredElement = this.rootElement.find("[name=required]");
        this.cdTemplate = this.rootElement.find("[name=cdTemplate]");
        this.componentTypeElement = this.rootElement.find("[name=component-type]");
        this.componentsElement = this.rootElement.find(".components");

        bindDictionary(this.requiredElement, CovenantsRequiredDict);
        bindDictionary(this.componentTypeElement, ComponentTypesDict);

        this.rootElement.find(".btn-add-component").click(() => {
            this._addNewComponent(this.componentTypeElement.val());
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
        if (!(model instanceof CovenantModel)) {
            throw "type error";
        }

        if (this.model) {
            // TODO: implement
            this._cleanupBindings();
        }

        this.model = model;

        this._initBindings();
        this._renderComponents();
    }

    _addNewComponent(type) {
        const componentModel = componentModelFactory({
            type: type });

        this.model
            .get("components")
            .add(componentModel);
    }

    _renderComponents() {
        this.model.get("components").forEach((componentModel) => {
            const componentView = componentFactory(componentModel);
            this.componentsElement.append(componentView.toElement());
        });
    }

    _initBindings() {
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.requiredElement, this.model, "required");
        bindInputValue(this.cdTemplate, this.model, "cdTemplate");
        this.model.on("destroy", this._onModelDestroy, this);
        this.model
            .get("components")
            .on("add", this._onComponentAdd, this);
    }

    _cleanupBindings() {
        unbindInputValue(this.nameElement, this.model, "name");
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.codeElement, this.model, "code");
        unbindInputValue(this.requiredElement, this.model, "required");
        unbindInputValue(this.cdTemplate, this.model, "cdTemplate");
        this.model
            .get("components")
            .off("add", this._onComponentAdd, this);
    }

    _onComponentAdd(componentModel, componentCollection) {
        const componentView = componentFactory(componentModel);
        this.componentsElement.append(componentView.toElement());
    }

    _onModelDestroy() {
        destroyRelationModels(this.model);
        this.destroy();
    }
}

export default Covenant;
