import $ from "jquery";

let template = $("#value-static").text();

class ValueStatic {
    constructor() {
        var _this = this;
        this.code = "";
        this.value = "";
        this.rootElement = $(template);
        this.codeElement = this.rootElement.find("[name=code]");
        this.valueElement = this.rootElement.find("[name=value]");

        this.codeElement.change((evt) => {
            this.code = this.codeElement.val();
        });

        this.valueElement.change(() => {
            this.value = this.valueElement.val();
        });
    }

    destroy() {
        //
    }

    toStore() {
        return {
            code: this.code,
            value: this.value
        };
    }

    toElement() {
        return this.rootElement;
    }
}

export default ValueStatic;
