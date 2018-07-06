import $ from "jquery";
import Component from "./component";
import CovenantModel from "../models/covenant";
import { bindDictionary, bindInputValue } from "../input-data-bind";
import { CovenantsRequiredDict } from "../dao/dictionaries";
import { componentFactory } from "../factories/component-factory";
import GlobalEvents from "../events";

const template = $("#covenant").text();

class Covenant {
    constructor() {
        this.model = new CovenantModel();
        this.components = [];
        this.parent = null;

        this.rootElement = $(template);
        this.nameElement = this.rootElement.find("[name=name]");
        this.codeElement = this.rootElement.find("[name=code]");
        this.requiredElement = this.rootElement.find("[name=required]");
        this.componentsElement = this.rootElement.find(".components");
        this.cdTemplate = this.rootElement.find("[name=cdTemplate]");

        bindDictionary(this.requiredElement, CovenantsRequiredDict);
        bindInputValue(this.nameElement, this.model, "name");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.codeElement, this.model, "code");
        bindInputValue(this.requiredElement, this.model, "required");
        bindInputValue(this.cdTemplate, this.model, "cdTemplate");

        this.rootElement.find(".btn-add-component").click(() => {
            this.addComponent(componentFactory());
        });

        GlobalEvents.on("component:destroyed", (evt) => {
            const parent = evt.parent;

            if (parent !== this) {
                return;
            }

            const target = evt.target;
            this.removeComponent(target);
        });
    }

    destroy() {
        this.components.forEach((component) => {
            component.destroy();
        });

        this.model.off();
        this.rootElement.remove();
    }

    toElement() {
        return this.rootElement;
    }

    toStore() {
        this.model.set(
            "components",
            this.components.map(component => component.toStore()));

        return this.model.toJSON();
    }

    fromStore(data) {
        const components = data.components || [];
        delete data.components;
        this.model.set(data);

        components.forEach((componentData) => {
            this.addComponent(componentFactory(componentData));
        });
    }

    addComponent(component) {
        if (!(component instanceof Component)) {
            throw "Could't add component";
        }

        component.setParent(this);
        this.components.push(component);
        this.componentsElement.append(component.toElement());

        GlobalEvents.trigger("component:created", {
            parent: this,
            target: component
        });
    }

    removeComponent(component) {
        if (!(component instanceof Component)) {
            throw "Could't remove component";
        }

        const idx = this.components.indexOf(component);

        if (idx >= 0) {
            this.components.splice(idx, 1);
            console.log("Remove component from", idx);
        }
    }

    setParent(parent) {
        this.parent = parent;
    }
}

export default Covenant;
