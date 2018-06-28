import $ from "jquery";
import ValueFactory from "./value-factory.js";

let template = $("#component").text();

class Component {
    constructor(code, name) {
        var _this = this;
        this.code = code;
        this.name = name;
        this.values = [];

        this.rootElement = $(template);
        this.valuesElement = this.rootElement.find(".values");
        this.addValueElement = this.rootElement.find(".btn-add-value");
        this.valueTypeElement = this.rootElement.find("[name=valueType]");

        this.addValueElement.click(() => {
            let valueType = _this.valueTypeElement.val();
            _this.addValue(valueType);
        });
    }

    destroy() {
        // TODO: implements
    }

    toElement() {
        return this.rootElement;
    }

    toStore() {
        let defaultValues = [];

        this.values.forEach((value) => {
            defaultValues.push(value.toStore());
        });

        return {
            code: this.code,
            name: this.name,
            defaultValues: defaultValues
        };
    }

    addValue(type) {
        let newValue = ValueFactory.createValue(type);
        this.values.push(newValue);
        this.valuesElement.append(newValue.toElement());
    }
}

export default Component;