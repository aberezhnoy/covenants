import $ from "jquery";
import componentValueFactory from "../factories/component-value-factory";
import { bindDictionary, bindInputValue } from "../input-data-bind";
import { ValueTypesDict } from "../dao/dictionaries";
import ComponentModel from "../models/component";
import GlobalEvents from "../events";

const template = $("#component").text();

class Component {
    constructor() {
        this.model = new ComponentModel();
        this.values = [];
        this.parent = null;

        this.rootElement = $(template);
        this.valuesElement = this.rootElement.find(".values");
        this.addValueElement = this.rootElement.find(".btn-add-value");
        this.valueTypeElement = this.rootElement.find("[name=valueType]");
        this.nameElement = this.rootElement.find("[name=name]");
        this.codeElement = this.rootElement.find("[name=code]");

        bindDictionary(this.valueTypeElement, ValueTypesDict);
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.codeElement, this.model, "code");

        this.addValueElement.click(() => {
            const newValue = componentValueFactory(this.valueTypeElement.val());
            this.addValue(newValue);
        });

        this.rootElement.find(".remove").click(() => {
            this.destroy();
        });

        GlobalEvents.on("component-value:destroyed", (evt) => {
            const parent = evt.parent;

            if (parent !== this) {
                return;
            }

            const target = evt.target;
            this.removeValue(target);
        });
    }

    destroy() {
        this.values.forEach(value => value.destroy());
        this.model.off();
        this.rootElement.remove();
        GlobalEvents.trigger("component:destroyed", {
            parent: this.parent,
            target: this
        });
    }

    toElement() {
        return this.rootElement;
    }

    toStore() {
        this.model.set(
            "defaultValues",
            this.values.map(value => value.toStore()));

        return this.model.toJSON();
    }

    fromStore(data) {
        const defaultValues = data.defaultValues || [];
        delete data.defaultValues;
        this.model.set(data);

        defaultValues.forEach((attributeValueData) => {
            const newValue = componentValueFactory(
                attributeValueData.type,
                attributeValueData);
            this.addValue(newValue);
        })  ;
    }

    addValue(value) {
        value.setParent(this);
        this.values.push(value);
        this.valuesElement.append(value.toElement());
    }

    removeValue(value) {
        const idx = this.values.indexOf(value);

        if (idx >= 0) {
            this.values.splice(idx, 1);
        }
    }

    setParent(parent) {
        this.parent = parent;
    }
}

export default Component;