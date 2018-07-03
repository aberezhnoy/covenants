import $ from "jquery";
import { ValueAttributeCollection } from "../../models/attribute-value";
import { bindDictionary } from "../../input-data-bind";
import { ValueAttributeModelTypesDict } from "../../models/attribute-value";
import AttributeEditorItem from "./editor-item";
import { attributeValueModelFactory } from "../../factories/attribute-value-factory";

const template = $("#attribute-editor").text();

class AttributeEditor {
    constructor() {
        this.model = new ValueAttributeCollection();
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

        this.rootElement.find(".cancel").click(() => {
            this.hide();
        });

        this.rootElement.find(".add-value").click(() => {
            const attrValueModel = attributeValueModelFactory(this.valueTypeElement.val());
            this.model.add(attrValueModel);
            this._addValue(attrValueModel);
        });

        this.rootElement.find(".print").click(() => {
            $("#output").val(JSON.stringify(this.toStore(), null, 2));
        });
    }

    destroy() {
        this._cleanUp();

        // TODO: implement
    }

    toElement() {
        return this.rootElement;
    }

    toStore() {
        return this.model.toJSON();
    }

    fromStore(data) {
        if (!(data instanceof Array)) {
            throw "Store must be an array";
        }

        this.model.set(data);

        this._render();
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

    _render() {
        this._cleanUp();

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
