import Component from "../view/components/component";
import CompositeComponent from "../view/components/composite-component";
import { ComponentModel, CompositeComponentModel } from "../models/component";

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