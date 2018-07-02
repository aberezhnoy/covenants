import $ from "jquery";
import { TemplateValueAttributesCollection } from "../../models/template-value";

const template = $("#template-editor").text();
const itemTemplate = $("#template-editor").text();

class TemplateEditor {
    constructor() {
        this.model = new TemplateValueAttributesCollection();
        this.rootElement = $(template);
        this.valuesElement = this.rootElement.find(".template-editor-values");
    }

    destroy() {
        //
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
    }

    _render() {
        //
    }
}

const templateEditorInst = new TemplateEditor();

export {
    TemplateEditor,
    templateEditorInst };
