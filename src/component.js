import $ from "jquery";

let template = $("#component").text();

class Component {
    constructor(code, name) {
        this.code = code;
        this.name = name;

        this.rootElement = $(template);
    }

    destroy() {
        // TODO: implements
    }

    toElement() {
        return this.rootElement;
    }

    toStore() {
        return {
            code: this.code,
            name: this.name
        };
    }
}

export default Component;