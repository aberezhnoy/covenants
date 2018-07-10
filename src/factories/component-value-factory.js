import ValueStatic from "../view/component-values/value-static";
import ValueTemplate from "../view/component-values/value-template";

let typeMapping = {
    "STATIC": ValueStatic,
    "TEMPLATE": ValueTemplate
};

function componentValueFactory(type, data) {
    const constr = typeMapping[type];

    if (!constr) {
        throw "Unknown value type: " + type;
    }

    const inst = new constr();

    if (data) {
        inst.fromStore(data);
    }

    return inst;
}

function componentValueModelFactory(data) {
    const type = data.type;


}

export {
    componentValueFactory,
    componentValueModelFactory };
