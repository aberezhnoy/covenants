import $ from "jquery";
import _ from "underscore";
import { CovenantCollection } from "../../models/covenant";
import { bindText, unbindText } from "../../input-data-bind";
import { covenantModelFactory } from "../../factories/covenant-factory";
import {
    clearComponentListView,
    destroyCovenantView,
    destroyComponentView, createCovenantView
} from "../views";

const template = $("#covenant-list").text();
const templateItem = $("#covenant-list-item").text();

class CovenantList {
    constructor() {
        this.model = null;
        this.selectedModel = null;
        this.cachedViews = {};
        this.destroyHandlers = [];

        this.rootElement = $(template);
        this.listElement = this.rootElement.find(".list");

        this.rootElement.find(".btn-add-covenant").click(() => {
            this._addNewCovenant();
        });
    }

    destroy() {
        this._cleanupBindings();
        this.model = null;
        this.rootElement.remove();
    }

    clear() {
        // destroy cached related view
        /*_.forEach(this.cachedViews, (covenantView, cid) => {
            covenantView.destroy();
        });*/

        // destroy list items
        /*_.forEach(this.destroyHandlers, (handler) => {
            if (handler) {
                handler();
            }
        });*/

        this.cachedViews = {};
        //this.destroyHandlers.length = 0;
    }

    toElement() {
        return this.rootElement;
    }

    setModel(model) {
        if (!(model instanceof CovenantCollection)) {
            throw "type error";
        }

        if (this.model) {
            this._cleanupBindings();
        }

        this.clear();

        this.model = model;
        this._initBindings();
        this.model.forEach(this._onCovenantAdd, this);
    }

    _initBindings() {
        this.model
            .on("add", this._onCovenantAdd, this);
    }

    _cleanupBindings() {
        this.model
            .off("add", this._onCovenantAdd, this);
    }

    _addNewCovenant() {
        this.model.add(covenantModelFactory({}));
    }

    _onCovenantAdd(covenantModel) {
        const onDestroy = () => {
            unbindText(codeElement, covenantModel, "code");
            unbindText(nameElement, covenantModel, "name");
            covenantModel.off("destroy", onDestroy);
            itemElement.remove();
        };

        const itemElement = $(templateItem);
        const codeElement = itemElement.find(".code");
        const nameElement = itemElement.find(".name");

        bindText(codeElement, covenantModel, "code");
        bindText(nameElement, covenantModel, "name");

        covenantModel.on("destroy", onDestroy);
        this.destroyHandlers.push(onDestroy);

        itemElement.click(() => {
            this.listElement
                .find("> .selected")
                .removeClass("selected");
            itemElement.addClass("selected");
            this._showCovenant(covenantModel);
        });

        this.listElement.append(itemElement);
    }

    _showCovenant(covenantModel) {
        if (this.selectedModel === covenantModel) {
            return;
        }

        destroyComponentView();
        clearComponentListView();
        destroyCovenantView();

        this.selectedModel = covenantModel;

        createCovenantView(covenantModel);

        /*let covenantView = this.cachedViews[this.selectedModel.cid];

        if (!covenantView) {
            covenantView = covenantFactory(this.selectedModel);
            covenantView
                .toElement()
                .hide()
                .appendTo(".layout.default .covenant-container");
            this.cachedViews[this.selectedModel.cid] = covenantView;
        }

        _.forEach(this.cachedViews, (covenantView, cid) => {
            covenantView.toElement().hide();
        });

        covenantView.toElement().show();*/
    }
}

export default CovenantList;
