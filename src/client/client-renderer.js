import { getExternalDictionary } from "../dao/dictionaries";

const currencyDict = getExternalDictionary("CURRENCY");

function replacePlaceholders(template, callback) {
    const re = /\$([a-zа-я0-9_]+)/ig;

    return template.replace(re, (match, placeholderName, offset, string) => {
        return callback(placeholderName);
    });
}

const attributeRenderers = {
    "PERCENTAGE": function(attributeMetaModel, attributeModel, templateProperty) {
        const value = attributeModel.get("value");

        return value + "%";
    },

    "DICT": function(attributeMetaModel, attributeModel, templateProperty) {
        const value = attributeModel.get("value");
        const dict = getExternalDictionary(value.dict);

        if (!dict) {
            return "[dictionary '" + value.dict + "' not found]";
        }

        return renderDict(dict.get(value.value), templateProperty);
    },

    "AMOUNT": function(attributeMetaModel, attributeModel, templateProperty) {
        const amount = attributeModel.get("value");
        const currencyDictItem = currencyDict.get(amount.currency);

        return amount.amount + " " + renderDict(currencyDictItem, templateProperty);
    }
};

function renderDict(dictItemModel, templateProperty) {
    return dictItemModel.get(templateProperty) || dictItemModel.get("title")
}

function renderCovenant(covenantMetaModel, conditionModel, templateProperty) {
    return replacePlaceholders(covenantMetaModel.get(templateProperty), (placeholderName) => {
        const componentMetaCollection = covenantMetaModel.get("components");

        const componentMetaModel = covenantMetaModel
            .get("components")
            .get(placeholderName);

        const conditionComponentModel = conditionModel
            .get("components")
            .get(placeholderName);

        return renderComponent(componentMetaModel, conditionComponentModel, componentMetaCollection, templateProperty);
    });
}

function renderComponent(componentMetaModel, conditionComponentModel, componentMetaCollection, templateProperty) {
    if (conditionComponentModel.get("type") === "COMPOSITE") {
        const values = conditionComponentModel.get("values");

        let res = values.map((_conditionComponentModel) => {
            const code = _conditionComponentModel.get("code");
            const _componentMetaModel = componentMetaCollection.get(code);

            return renderComponent(
                _componentMetaModel,
                _conditionComponentModel,
                componentMetaCollection);
        });

        return res.join(" ");
    } else {
        const valueModel = conditionComponentModel.get("value");
        const valueModelCode = valueModel.get("value");

        const componentValueMetaModel = componentMetaModel
            .get("defaultValues")
            .get(valueModelCode);

        const template = componentMetaModel.get(templateProperty);

        if (template) {
            const compValRender = renderComponentValue(componentValueMetaModel, valueModel, templateProperty);

            if (compValRender && compValRender.length > 0) {
                return replacePlaceholders(template, (placeholderName) => {
                    if (placeholderName === "out") {
                        return compValRender;
                    }
                });
            } else {
                return "";
            }
        } else {
            return renderComponentValue(componentValueMetaModel, valueModel, templateProperty);
        }
    }
}

function renderComponentValue(componentValueMetaModel, valueModel, templateProperty) {
    const type = valueModel.get("type");

    if (type === "STATIC") {
        return componentValueMetaModel.get(templateProperty);
    } else if (type === "TEMPLATE") {
        const template = componentValueMetaModel.get(templateProperty);
        const attributesMetaCollection = componentValueMetaModel.get("attributes");
        const attributesCollection = valueModel.get("attributes");

        return replacePlaceholders(template, (placeholderName) => {
            const attributeMetaModel = attributesMetaCollection.get(placeholderName);
            const attributeModel = attributesCollection.get(placeholderName);

            return renderValueAttribute(attributeMetaModel, attributeModel, templateProperty);
        });
    } else {
        return "[value renderer for '" + type + "' not found]";
    }
}

function renderValueAttribute(attributeMetaModel, attributeModel, templateProperty) {
    const type = attributeModel.get("type");
    const renderer = attributeRenderers[type];

    if (!renderer) {
        return "[attribute renderer for '" + type + "' not found]";
    }

    return renderer(attributeMetaModel, attributeModel, templateProperty);
}

export {
    renderCovenant };
