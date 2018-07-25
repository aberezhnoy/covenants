import $ from "jquery";
import _ from "underscore";
import { CovenantCollection } from "../../models/covenant";
import { bindText, unbindText } from "../../input-data-bind";
import { covenantFactory, covenantModelFactory } from "../../factories/covenant-factory";

const template = $("#covenant-list").text();
const templateItem = $("#covenant-list-item").text();

class CovenantList {
    constructor() {
        this.model = null;
        this.selectedModel = null;
        this.cachedViews = {};

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
        _.forEach(this.cachedViews, (covenantView, cid) => {
            covenantView.destroy();
        });
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

        _.forEach(this.cachedViews, (covenantView, cid) => {
            covenantView.destroy();
        });

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
            delete this.cachedViews[covenantModel.cid];
        };

        const itemElement = $(templateItem);
        const codeElement = itemElement.find(".code");
        const nameElement = itemElement.find(".name");

        bindText(codeElement, covenantModel, "code");
        bindText(nameElement, covenantModel, "name");
        covenantModel.on("destroy", onDestroy);

        itemElement.click(() => {
            this._showCovenant(covenantModel);
        });

        this.listElement.append(itemElement);
    }

    _showCovenant(covenantModel) {
        if (this.selectedModel === covenantModel) {
            return;
        }

        this.selectedModel = covenantModel;

        let covenantView = this.cachedViews[this.selectedModel.cid];

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

        covenantView.toElement().show();
    }
}

export default CovenantList;
