import $ from "jquery";
import {
    bindDictionary,
    bindText,
    unbindText } from "../../input-data-bind";
import { componentModelFactory, componentFactory } from "../../factories/component-factory";
import { ComponentCollection } from "../../models/covenant";
import { ComponentTypesDict } from "../../dao/dictionaries";

const template = $("#component-list").text();
const templateItem = $("#component-list-item").text();

class ComponentList {
    constructor() {
        this.model = null;
        this.selectedModel = null;
        this.cachedViews = {};

        this.rootElement = $(template);
        //this.componentsElement = this.rootElement.find(".list");
        this.componentsStandartElement = this.rootElement.find(".list .list-type-standard");
        this.componentsCompositeElement = this.rootElement.find(".list .list-type-composite");
        this.componentTypeElement = this.rootElement.find("[name=component-type]");

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
        if (!(model instanceof ComponentCollection)) {
            throw "type error";
        }

        if (this.model) {
            this._cleanupBindings();
        }

        this.model = model;
        this._initBindings();
        this.model.forEach(this._onComponentAdd, this);
    }

    _initBindings() {
        this.model
            .on("add", this._onComponentAdd, this);
    }

    _cleanupBindings() {
        this.model
            .off("add", this._onComponentAdd, this);
    }

    _onComponentAdd(componentModel) {
        const type = componentModel.getType();

        if (type === "STD") {
            this.componentsStandartElement.append(this._createComponentListItem(componentModel));
        } else if (type === "COMPOSITE") {
            this.componentsCompositeElement.append(this._createComponentListItem(componentModel));
        }
    }

    _createComponentListItem(componentModel) {
        const onDestroy = () => {
            unbindText(codeElement, componentModel, "code");
            unbindText(nameElement, componentModel, "name");
            componentModel.off("destroy", onDestroy);
            itemElement.remove();
            delete this.cachedViews[componentModel.cid];
        };

        const itemElement = $(templateItem);
        const codeElement = itemElement.find(".code");
        const nameElement = itemElement.find(".name");

        bindText(codeElement, componentModel, "code");
        bindText(nameElement, componentModel, "name");

        componentModel.on("destroy", onDestroy);

        itemElement.click(() => {
            this._showComponent(componentModel);
        });

        return itemElement;
    }

    _addNewComponent(type) {
        const componentModel = componentModelFactory({
            type: type });

        this.model.add(componentModel);
    }

    _showComponent(componentModel) {
        if (this.selectedModel === componentModel) {
            return;
        }

        this.selectedModel = componentModel;

        let componentView = this.cachedViews[this.selectedModel.cid];

        if (!componentView) {
            componentView = componentFactory(this.selectedModel);
            componentView
                .toElement()
                .hide()
                .appendTo(".layout.default .component-container");
            this.cachedViews[this.selectedModel.cid] = componentView;
        }

        for (let cid in this.cachedViews) {
            if (!this.cachedViews.hasOwnProperty(cid)) {
                continue;
            }

            const view = this.cachedViews[cid];
            view.toElement().hide();
        }

        componentView.toElement().show();
    }
}

export default ComponentList;
