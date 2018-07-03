import ValueStatic from "../view/component-values/value-static.js";
import ValueTemplate from "../view/component-values/value-template.js";

let typeMapping = {
    "static": ValueStatic,
    "template": ValueTemplate
};

function componentValueFactory(type) {
    const constr = typeMapping[type];

    if (!constr) {
        throw "Unknown value type: " + type;
    }

    return new constr();
}

export default componentValueFactory;
