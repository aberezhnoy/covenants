import ValueStatic from "./values/value-static.js";
import ValueTemplate from "./values/value-template.js";

let typeMapping = {
    "static": ValueStatic,
    "template": ValueTemplate
};

export default {
    TYPE_STATIC: "static",

    createValue: function(type) {
        let constr = typeMapping[type];

        if (!constr) {
            throw "Unknown value type: " + type;
        }

        return new constr();
    }
};
