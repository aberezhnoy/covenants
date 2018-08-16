import { Dictionary } from "../models/dictionary";
import SystemDictionary from "../resources/system";
import Currency from "../resources/currency";
import Covenants from "../resources/covenants";
import ExternalDictionaries from "../resources/external-dict";
import _ from "underscore";

const ValueTypesDict = new Dictionary(SystemDictionary["valueTypes"]);
const ComponentTypesDict = new Dictionary(SystemDictionary["componentTypes"]);

// covenants

const CovenantsRequiredDict = new Dictionary(Covenants["required"]);

// external dictionaries

const CurrencyDict = new Dictionary(Currency);

const externalDictionariesCache = {
    "CURRENCY": CurrencyDict
};

function getExternalDictionary(type) {
    const externalDict = externalDictionariesCache[type];

    if (externalDict && externalDict instanceof Dictionary) {
        return externalDict;
    } else {
        const dict = ExternalDictionaries.dict[type];

        if (!dict) {
            throw "Unknown dict type: " + type;
        }

        const externalDict = new Dictionary(dict);
        externalDictionariesCache[type] = externalDict;

        return externalDict;
    }
}

let dictData = ExternalDictionaries["list"];

if (window._dicts && _.isArray(window._dicts)) {
    dictData = dictData.concat(window._dicts);
}

const ExternalDictionariesDict = new Dictionary(dictData);

export {
    ValueTypesDict,
    ComponentTypesDict,
    CovenantsRequiredDict,

    ExternalDictionariesDict,
    getExternalDictionary};
