import Component from "../view/component";
import CompositeComponent from "../view/composite-component";
import ComponentModel from "../models/component";
import CompositeComponentModel from "../models/composite-component";

const modelMapping = {
    "STD": ComponentModel,
    "COMPOSITE": CompositeComponentModel
};

const viewMapping = {
    "STD": Component,
    "COMPOSITE": CompositeComponent
};

function componentFactory(model) {
    const type = model.getType();
    const constr = viewMapping[type];

    if (!constr) {
        throw "Could't find component view for " + type;
    }

    const inst = new constr();
    inst.setModel(model);

    return inst;
}

function componentModelFactory(data) {
    const constr = modelMapping[data.type];

    if (!constr) {
        throw "Could't find component model for " + data.type;
    }

    return new constr(data);
}

export {
    componentFactory,
    componentModelFactory};