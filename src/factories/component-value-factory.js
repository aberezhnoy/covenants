import ValueStatic from "../view/values/value-static.js";
import ValueTemplate from "../view/values/value-template.js";

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
