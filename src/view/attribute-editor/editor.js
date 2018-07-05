import $ from "jquery";
import { ValueAttributeCollection } from "../../models/attribute-value";
import { bindDictionary, unbindDictionary } from "../../input-data-bind";
import { ValueAttributeModelTypesDict } from "../../models/attribute-value";
import AttributeEditorItem from "./editor-item";
import { attributeValueModelFactory } from "../../factories/attribute-value-factory";

const template = $("#attribute-editor").text();

class AttributeEditor {
    constructor() {
        this.model = null;
        this.doneCallback = null;
        this.values = [];
        this.rootElement = $(template);
        this.valuesElement = this.rootElement.find(".attribute-editor-values");
        this.valueTypeElement = this.rootElement.find(".value-type");

        bindDictionary(this.valueTypeElement, ValueAttributeModelTypesDict);

        this.rootElement.find(".done").click(() => {
            if (this.doneCallback) {
                this.doneCallback();
            }

            this.hide();
        });

        this.rootElement.find(".add-value").click(() => {
            const attrValueModel = attributeValueModelFactory(this.valueTypeElement.val());
            this.model.add(attrValueModel);
            this._addValue(attrValueModel);
        });
    }

    destroy() {
        this.doneCallback = null;
        unbindDictionary(this.valueTypeElement, ValueAttributeModelTypesDict);
        this._cleanUp();
    }

    toElement() {
        return this.rootElement;
    }

    show() {
        this.rootElement.show();
    }

    hide() {
        this.rootElement.hide();
    }

    setDoneCallback(cb) {
        this.doneCallback = cb;
    }

    setModel(model) {
        this._cleanUp();

        if (!model) {
            return;
        } else if (!(model instanceof ValueAttributeCollection)) {
            throw "type error";
        }

        model.on("_remove", (mdl, view) => {
            model.remove(mdl);
            const idx = this.values.indexOf(view);

            if (idx >= 0) {
                this.values.splice(idx, 1);
            }
        });

        this.model = model;
        this._render();
    }

    _render() {
        this.model.forEach((attrValueModel) => {
            this._addValue(attrValueModel);
        });
    }

    _cleanUp() {
        this.values.forEach(value => value.destroy());
        this.values.length = 0;
        this.valuesElement.empty();
    }

    _addValue(attrValueModel) {
        const item = new AttributeEditorItem(attrValueModel);
        this.values.push(item);
        this.valuesElement.append(item.toElement());
    }
}

const attributeEditorInst = new AttributeEditor();

export {
    AttributeEditor,
    attributeEditorInst };
