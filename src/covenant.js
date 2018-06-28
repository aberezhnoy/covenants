import $ from "jquery";
import Component from "./component";

let template = $("#covenant").text();

class Covenant {
    constructor(name, type, required) {
        let _this = this;
        this.name = name;
        this.type = type;
        this.required = required;
        this.components = [];
        this.rootElement = $(template);
        this.componentsElement = this.rootElement.find(".components");

        this.rootElement.find(".btn-add-component").click((evt) => {
            let newComponent = new Component("", "", "REQUIRED");
            _this.addComponent(newComponent);
        });

        this.rootElement.find("[name=to-output]").click(() => {
            $("#output").val(JSON.stringify(this.toStore(), null, 2));
        });
    }

    toElement() {
        return this.rootElement;
    }

    toStore() {
        let components = [];

        this.components.forEach((component) => {
            components.push(component.toStore());
        });

        return {
            name: this.name,
            components: components
        };
    }

    addComponent(component) {
        if (!(component instanceof Component)) {
            console.log("could add component");
            return;
        }

        this.components.push(component);
        this.componentsElement.append(component.toElement());
    }
}

export default Covenant;
