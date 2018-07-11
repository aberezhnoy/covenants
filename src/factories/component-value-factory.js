import ValueStatic from "../view/component-values/value-static";
import ValueTemplate from "../view/component-values/value-template";
import { ComponentStaticValueModel, ComponentTemplateValueModel } from "../models/component-value";

const modelMapping = {
    "STATIC": ComponentStaticValueModel,
    "TEMPLATE": ComponentTemplateValueModel };

const viewMapping = {
    "STATIC": ValueStatic,
    "TEMPLATE": ValueTemplate };

function componentValueFactory(model) {
    const type = model.getType();
    const constr = viewMapping[type];

    if (!constr) {
        throw "Unknown value type: " + type;
    }

    const inst = new constr();
    inst.setModel(model);

    return inst;
}

function componentValueModelFactory(data) {
    const constr = modelMapping[data.type];

    if (!constr) {
        throw "Could't find component-value model for " + data.type;
    }

    return new constr(data);
}

export {
    componentValueFactory,
    componentValueModelFactory };
