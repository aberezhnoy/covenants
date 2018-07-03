import $ from "jquery";
import { bindInputValue, unbindInputValue } from "../../input-data-bind";
import { attributeValueFactory } from "../../factories/attribute-value-factory";

const template = $("#attribute-editor-item").text();

class AttributeEditorItem {
    constructor(model) {
        this.model = model;
        this.value = attributeValueFactory(model);

        this.rootElement = $(template);
        this.keyElement = this.rootElement.find(".item-key");
        this.valueContainerElement = this.rootElement.find(".item-value");

        this.valueContainerElement.append(this.value.toElement());

        bindInputValue(this.keyElement, this.model, "key");
    }

    destroy() {
        this.value.destroy();
        unbindInputValue(this.keyElement, this.model, "key");
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }
}

export default AttributeEditorItem;
