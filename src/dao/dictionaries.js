import { Dictionary } from "../dao/dictionary-model";
import SystemDictionary from "../resources/system";
import Currency from "../resources/currency";
import Covenants from "../resources/covenants"

const ValueTypesDict = new Dictionary(SystemDictionary["valueTypes"]);
const TemplateValueTypesDict = new Dictionary(SystemDictionary["templateValueTypes"]);
const CurrencyDict = new Dictionary(Currency);

// covenants

const CovenantsRequiredDict = new Dictionary(Covenants["required"]);

export {
    ValueTypesDict,
    TemplateValueTypesDict,
    CurrencyDict,
    CovenantsRequiredDict };
