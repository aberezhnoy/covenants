import CovenantList from "./covenant/covenant-list";
import ComponentList from "./components/component-list";
import { covenantFactory } from "../factories/covenant-factory";
import { componentFactory } from "../factories/component-factory";

const covenantListView = new CovenantList();
const componentListView = new ComponentList();
componentListView.toElement().hide();

let covenantView = null;
let componentView = null;

function destroyCovenantView() {
    if (covenantView) {
        covenantView.destroy();
    }
}

function destroyComponentView() {
    if (componentView) {
        componentView.destroy();
    }
}

function createCovenantView(model) {
    covenantView = covenantFactory(model);

    covenantView
        .toElement()
        .appendTo(".layout.default .covenant-container");

    return covenantView;
}

function createComponentView(model) {
    componentView = componentFactory(model);

    componentView
        .toElement()
        .appendTo(".layout.default .component-container");

    return componentView;
}

function clearComponentListView() {
    componentListView.clear();
}

export {
    covenantListView,
    componentListView,
    destroyCovenantView,
    destroyComponentView,
    createCovenantView,
    createComponentView,
    clearComponentListView };
