import $ from "jquery";
import _ from "underscore";
import {
    bindDictionary,
    bindText,
    unbindText } from "../../input-data-bind";
import { componentModelFactory } from "../../factories/component-factory";
import { ComponentCollection } from "../../models/covenant";
import { ComponentTypesDict } from "../../dao/dictionaries";
import { createComponentView, destroyComponentView } from "../views";

const template = $("#component-list").text();
const templateItem = $("#component-list-item").text();

class ComponentList {
    constructor() {
        this.model = null;
        this.selectedModel = null;
        this.cachedViews = {};
        this.items = {};

        this.rootElement = $(template);
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

    clear() {
        _.forEach(this.items, (view) => {
            view.destroy_();
        });

        this.cachedViews = {};

        this.toElement().hide();
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

        this.clear();

        this.model = model;
        this._initBindings();
        this.model.forEach(this._onComponentAdd, this);

        this.toElement().show();
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
            this.componentsStandartElement.append(
                this._createComponentListItem(componentModel)
                    .toElement());
        } else if (type === "COMPOSITE") {
            this.componentsCompositeElement.append(
                this._createComponentListItem(componentModel)
                    .toElement());
        }
    }

    _createComponentListItem(componentModel) {
        let _this = this;

        const itemView = {
            init: function(componentModel) {
                this.componentModel = componentModel;
                this.itemElement = $(templateItem);
                this.codeElement = this.itemElement.find(".code");
                this.nameElement = this.itemElement.find(".name");

                bindText(this.codeElement, this.componentModel, "code");
                bindText(this.nameElement, this.componentModel, "name");
                this.componentModel.on("destroy", itemView.destroy_, itemView);

                _this.items[this.componentModel.cid] = this;

                this.itemElement.click(() => {
                    _this._showComponent(componentModel);
                });
            },

            destroy_: function() {
                unbindText(this.codeElement, this.componentModel, "code");
                unbindText(this.nameElement, this.componentModel, "name");
                this.componentModel.off("destroy", this.destroy_, this);
                this.itemElement.remove();

                delete _this.items[this.componentModel.cid];
            },

            toElement: function() {
                return this.itemElement;
            }
        };

        itemView.init(componentModel);

        return itemView;
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

        destroyComponentView();

        this.selectedModel = componentModel;

        createComponentView(componentModel);

        /*let componentView = this.cachedViews[this.selectedModel.cid];

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

        componentView.toElement().show();*/
    }
}

export default ComponentList;
