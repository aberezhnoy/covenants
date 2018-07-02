import $ from "jquery";

const template = $("#template-editor").text();
const itemTemplate = $("#template-editor").text();

class TemplateEditor {
    constructor() {
        this.values = [];
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
        return this.values;
    }

    fromStore(data) {
        if (!(data instanceof Array)) {
            throw "Store must be an array";
        }

        this.values = data;
    }

    _render() {
        //
    }
}

const templateEditorInst = new TemplateEditor();

export {
    TemplateEditor,
    templateEditorInst };
