import { Collection, Model } from "backbone";
import _ from "underscore";

function destroyRelationModels(model) {
    if (!_.isFunction(model._relations)) {
        return;
    }

    const fieldNames = Object.keys(model._relations());

    fieldNames.forEach((fieldName) => {
        const relationModel = model.get(fieldName);

        if (relationModel instanceof Collection) {
            relationModel.set([]);
        } else if (relationModel instanceof Model) {
            relationModel.destroy();
        } else {
            console.log("REL UNKNOWN");
        }
    });
}

function modelIdentifierCode(attrs) {
    return attrs.code;
}

export {
    destroyRelationModels,
    modelIdentifierCode };
