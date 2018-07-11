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

        this.rootElement = $(template);
        this.componentsElement = this.rootElement.find(".list");
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
            .on("add", this._onComponentAdd, this)
            .on("remove", this._onComponentRemove, this);
    }

    _cleanupBindings() {
        this.model
            .off("add", this._onComponentAdd, this)
            .off("remove", this._onComponentRemove, this);
    }

    _onComponentAdd(componentModel) {
        this.componentsElement.append(this._createComponentListItem(componentModel));
    }

    _onComponentRemove(componentModel) {
        // ???
    }

    _createComponentListItem(componentModel) {
        const onDestroy = () => {
            unbindText(codeElement, componentModel, "code");
            unbindText(nameElement, componentModel, "name");
            componentModel.off("destroy", onDestroy);
            itemElement.remove();
        };

        const itemElement = $(templateItem);
        const codeElement = itemElement.find(".code");
        const nameElement = itemElement.find(".name");

        bindText(codeElement, componentModel, "code");
        bindText(nameElement, componentModel, "name");

        componentModel.on("destroy", onDestroy);

        itemElement.click(() => {
            const componentView = componentFactory(componentModel);
            componentView
                .toElement()
                .appendTo(".layout.default .component-container");
        });

        return itemElement;
    }

    _addNewComponent(type) {
        const componentModel = componentModelFactory({
            type: type });

        this.model.add(componentModel);
    }
}

export default ComponentList;
