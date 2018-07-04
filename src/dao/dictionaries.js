import { Dictionary } from "../models/dictionary";
import SystemDictionary from "../resources/system";
import Currency from "../resources/currency";
import Covenants from "../resources/covenants";
import ExternalDictionaries from "../resources/external-dict";

const ValueTypesDict = new Dictionary(SystemDictionary["valueTypes"]);

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

const ExternalDictionariesDict = new Dictionary(ExternalDictionaries["list"]);

export {
    ValueTypesDict,
    CovenantsRequiredDict,

    ExternalDictionariesDict,
    getExternalDictionary};
