import { getExternalDictionary } from "../dao/dictionaries";

const currencyDict = getExternalDictionary("CURRENCY");

function replacePlaceholders(template, callback) {
    const re = /\$([a-zа-я0-9_]+)/ig;

    return template.replace(re, (match, placeholderName, offset, string) => {
        return callback(placeholderName);
    });
}

const attributeRenderers = {
    "PERCENTAGE": function(attributeMetaModel, attributeModel) {
        const value = attributeModel.get("value");

        return value + "%";
    },

    "DICT": function(attributeMetaModel, attributeModel) {
        const value = attributeModel.get("value");
        const dict = getExternalDictionary(value.dict);

        if (!dict) {
            return "[dictionary '" + value.dict + "' not found]";
        }

        const item = dict.get(value.value);

        return item.get("title");
    },

    "AMOUNT": function(attributeMetaModel, attributeModel) {
        const amount = attributeModel.get("value");
        const currencyTitle = currencyDict
            .get(amount.currency)
            .get("title");

        return amount.amount + " " + currencyTitle;
    }
};

function renderCovenant(covenantMetaModel, conditionModel) {
    return replacePlaceholders(covenantMetaModel.get("cdTemplate"), (placeholderName) => {
        const componentMetaCollection = covenantMetaModel.get("components");

        const componentMetaModel = covenantMetaModel
            .get("components")
            .get(placeholderName);

        const conditionComponentModel = conditionModel
            .get("components")
            .get(placeholderName);

        return renderComponent(componentMetaModel, conditionComponentModel, componentMetaCollection);
    });
}

function renderComponent(componentMetaModel, conditionComponentModel, componentMetaCollection) {
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

        return renderComponentValue(componentValueMetaModel, valueModel);
    }
}

function renderComponentValue(componentValueMetaModel, valueModel) {
    const type = valueModel.get("type");

    if (type === "STATIC") {
        return componentValueMetaModel.get("name");
    } else if (type === "TEMPLATE") {
        const template = componentValueMetaModel.get("cdTemplate");
        const attributesMetaCollection = componentValueMetaModel.get("attributes");
        const attributesCollection = valueModel.get("attributes");

        return replacePlaceholders(template, (placeholderName) => {
            const attributeMetaModel = attributesMetaCollection.get(placeholderName);
            const attributeModel = attributesCollection.get(placeholderName);

            return renderValueAttribute(attributeMetaModel, attributeModel);
        });
    } else {
        return "[value renderer for '" + type + "' not found]";
    }
}

function renderValueAttribute(attributeMetaModel, attributeModel) {
    const type = attributeModel.get("type");
    const renderer = attributeRenderers[type];

    if (!renderer) {
        return "[attribute renderer for '" + type + "' not found]";
    }

    return renderer(attributeMetaModel, attributeModel);
}

export {
    renderCovenant };
