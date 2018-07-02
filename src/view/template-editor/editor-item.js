import $ from "jquery";
import { bindDictionary } from "../../input-data-bind";
import { TemplateValueTypesDict } from "../../dao/dictionaries";

const template = $("#template-editor-item").text();

class TemplateEditorItem {
    constructor() {
        this.key = "";
        this.valueType = "";
        this.value = null;

        this.rootElement = $(template);
        this.keyElement = this.rootElement.find(".item-name");
        this.valueTypeElement = this.rootElement.find(".item-type");
        this.valueContainerElement = this.rootElement.find(".item-value");

        bindDictionary(this.valueTypeElement, TemplateValueTypesDict);
    }

    destroy() {
        //
    }

    toStore() {
        return {
            "default": this.value,
            type: this.valueType
        };
    }

    toElement() {
        return this.rootElement;
    }
}

export default TemplateEditorItem;