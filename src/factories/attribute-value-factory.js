import ScalarAttributeValue from "../view/attribute-editor/values/scalar";
import AmountAttributeValue from "../view/attribute-editor/values/amount";
import PercentageAttributeValue from "../view/attribute-editor/values/percentage";
import DictionaryAttributeValue from "../view/attribute-editor/values/dictionary";
import DateAttributeValue from "../view/attribute-editor/values/date";

import { valueAttributeModelTypes } from "../models/attribute-value";

import {
    TYPE_DATE,
    TYPE_SCALAR,
    TYPE_PERCENTAGE,
    TYPE_DICT,
    TYPE_AMOUNT } from "../models/attribute-value";

const typeMapping = {
    [TYPE_DICT]: DictionaryAttributeValue,
    [TYPE_DATE]: DateAttributeValue,
    [TYPE_SCALAR]: ScalarAttributeValue,
    [TYPE_PERCENTAGE]: PercentageAttributeValue,
    [TYPE_AMOUNT]: AmountAttributeValue
};


function attributeValueFactory(model) {
    const type = model.getType();
    const attrValueConstr = typeMapping[type];

    if (!attrValueConstr) {
        throw "Could't find attr-value for type " + type;
    }

    const inst = new attrValueConstr(model);

    return inst;
}

function attributeValueModelFactory(type) {
    const attrValueModelConstr = valueAttributeModelTypes[type];

    if (!attrValueModelConstr) {
        throw "Could't find attr-value-mode for type " + type;
    }

    return new attrValueModelConstr();
}

export {
    attributeValueFactory,
    attributeValueModelFactory };
