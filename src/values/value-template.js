import $ from "jquery";

let template = $("#value-template").text();

class ValueTemplate {
    constructor() {
        this.code = "";
        this.name = "";
        this.rootElement = $(template);
        /*this.codeElement = this.rootElement.find("[name=code]");
        this.valueElement = this.rootElement.find("[name=value]");

        this.codeElement.change((evt) => {
            this.code = this.codeElement.val();
        });

        this.valueElement.change(() => {
            this.value = this.valueElement.val();
        });*/
    }

    destroy() {
        //
    }

    toStore() {
        return {
            code: this.code,
            name: this.name,

        };
    }

    toElement() {
        return this.rootElement;
    }
}

export default ValueTemplate;