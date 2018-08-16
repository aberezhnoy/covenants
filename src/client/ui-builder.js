import $ from "jquery";
import _ from "underscore";
import { COMPONENT_VALUE_STATIC, COMPONENT_VALUE_TEMPLATE } from "../models/component-value";
import {
    TYPE_AMOUNT,
    TYPE_DATE,
    TYPE_DICT,
    TYPE_PERCENTAGE, TYPE_PERIOD,
    TYPE_SCALAR
} from "../models/attribute-value";
import { renderSelect } from "../input-data-bind";
import { getExternalDictionary } from "../dao/dictionaries";
import { renderCovenant } from "./client-renderer";
import {ConditionModel} from "./models/condition";

function parseNumber(expr) {
    const res = parseInt(expr, 10);

    if (isNaN(res)) {
        return 0;
    } else {
        return res;
    }
}

function getAttributeValue(view, componentValueMetaModel, attrMetaModel) {
    const inputViews = view.find(
        "[data-type=attr]" +
        "[data-value-code=" + componentValueMetaModel.get("code") + "]" +
        "[data-attr-key=" + attrMetaModel.get("key") + "]");
    const type = attrMetaModel.get("type");
    let res;

    if (type === TYPE_SCALAR) {
        res = inputViews.val()
    } else if (type === TYPE_PERCENTAGE) {
        res = parseNumber(inputViews.val());
    } else if (type === TYPE_DATE) {
        res = Date.now();
    } else if (type === TYPE_AMOUNT) {
        res = {
            amount: parseNumber(inputViews.filter("input").val()),
            currency: inputViews.filter("select").val()
        };
    } else if (type === TYPE_DICT) {
        res = {
            dict: attrMetaModel.get("dict"),
            value: inputViews.val()
        };
    } else if (type === TYPE_PERIOD) {
        res = {
            period: parseNumber(inputViews.filter("input").val()),
            unit: inputViews.filter("select").val()
        }
    }

    return res;
}

function getInputValuesStd(view, componentMetaModel, val, code) {
    let res;

    const componentValueMetaModel = componentMetaModel
        .get("defaultValues")
        .get(val);

    const valueType = componentValueMetaModel.get("type");

    if (valueType === COMPONENT_VALUE_STATIC) {
        res = {
            code: code,
            value: {
                type: COMPONENT_VALUE_STATIC,
                value: val
            }
        };
    } else if (valueType === COMPONENT_VALUE_TEMPLATE) {
        const attributes = [];

        componentValueMetaModel
            .get("attributes")
            .forEach((attrMetaModel) => {
                const attrVal = getAttributeValue(view, componentValueMetaModel, attrMetaModel);

                attributes.push({
                    key: attrMetaModel.get("key"),
                    type: attrMetaModel.get("type"),
                    value: attrVal
                });
            });

        res = {
            code: code,
            value: {
                type: COMPONENT_VALUE_TEMPLATE,
                value: val,
                attributes: attributes
            }
        };
    }

    return res;
}

function getInputValues(view, covenantMetaModel, val, code) {
    let res;

    const componentMetaModel = covenantMetaModel
        .get("components")
        .get(code);

    const componentType = componentMetaModel.get("type");

    if (componentType === "STD") {
        res = getInputValuesStd(view, componentMetaModel, val, code);
    } else if (componentType === "COMPOSITE") {
        // nothing here
    }

    return res;
}

function renderCovenantUI(covenantMetaModel) {
    const view = $(
        "<div style='background-color: #F0F0F0; padding: 10px;'>" +
            "<div class='compts'></div>" +
            "<div style='margin-top: 10px;'><textarea style='width: 99%; height: 300px;'></textarea></div>" +
            "<div style='margin-top: 10px;'>" +
                "<button class='do-print'>Вывести текст</button>" +
                "<select class='templatePropertyName'>" +
                    "<option value='cdTemplate'>ПРКО</option>" +
                    "<option value='oTemplate'>КОД</option>" +
                "</select>" +
                "<button class='do-refresh'>Обновить</button>" +
            "</div>" +
        "</div>");

    const componentViews = covenantMetaModel
        .get("components")
        .map((componentMetaModel) => {
            return renderComponentUI(componentMetaModel, covenantMetaModel);
        });

    view
        .find(".compts")
        .append(componentViews);

    view
        .find(".do-print")
        .click(() => {
            const inputs = view.find("select[data-type=component]");

            const userInput = {
                code: covenantMetaModel.get("code"),
                components: []
            };

            const components = userInput.components;

            _.forEach(inputs, (input) => {
                const val = $(input).val();
                const code = $(input).attr("data-code");
                components.push(getInputValues(view, covenantMetaModel, val, code));
            });

            const conditionModel = new ConditionModel(userInput);
            const templatePropertyName = view
                .find("select.templatePropertyName")
                .val();
            const text = renderCovenant(covenantMetaModel, conditionModel, templatePropertyName);
            view.find("textarea").val(text);
        });

    return view;
}

function renderComponentUI(componentMetaModel, covenantMetaModel) {
    const type = componentMetaModel.get("type");
    let view;

    if (type === "STD" && !isComponentIncludesInComposite(componentMetaModel, covenantMetaModel)) {
        view = $(
            "<div style='margin-top: 10px;'>" +
                componentMetaModel.get("name") + ": <br/>" +
                "<div class='val-sel'></div>" +
            "</div>");

        view
            .find(".val-sel")
            .append(renderStdComponentUI(componentMetaModel));
    } else if (type === "COMPOSITE") {
        view = $(
            "<div style='margin-top: 10px;'>" +
                "<div>" + componentMetaModel.get("name") + ":</div>" +
            "</div>");

        _.forEach(componentMetaModel.get("childs"), (item) => {
            if (item.operator) {
                view.append("<div>" + item.operator + "</div>");
            } else if (item.link) {
                const _componentMetaModel =  covenantMetaModel
                    .get("components")
                    .get(item.link);

                if (_componentMetaModel) {
                    if (isComponentIncludesInComposite(_componentMetaModel, covenantMetaModel)) {
                        view.append(renderStdComponentUI(_componentMetaModel))
                    }
                } else {
                    view.append("<div>could find component: " + item.link + "</div>");
                }
            }
        });
    }

    return view;
}

function renderStdComponentUI(componentMetaModel) {
    const view = $(
        "<div>" +
            "<select class='component-value-selector' data-type='component'></select>" +
            "<div class='template-input-pane' style='margin-left: 10px;'></div>" +
        "</div>");

    const valueSelector = view.find(".component-value-selector");
    const inputPane = view.find(".template-input-pane");

    valueSelector
        .attr("name", "components." + componentMetaModel.get("code"))
        .attr("data-code", componentMetaModel.get("code"));

    componentMetaModel.get("defaultValues").forEach((componentValueMetaModel) => {
        valueSelector.append(
            "<option value='" +
            componentValueMetaModel.get("code") +
            "'>" +
            componentValueMetaModel.get("name") +
            "</option>");
    });

    valueSelector.change(() => {
        const code = valueSelector.val();
        const componentValueMetaModel = componentMetaModel
            .get("defaultValues")
            .get(code);
        const componentType = componentValueMetaModel.get("type");

        inputPane.empty();

        if (componentType === COMPONENT_VALUE_STATIC) {
            // nothing here
        } else if (componentType === COMPONENT_VALUE_TEMPLATE) {
            const attrViews = componentValueMetaModel
                .get("attributes")
                .map((valueAttributeMetaModel) => {
                    return renderValueAttributeUI(componentValueMetaModel, valueAttributeMetaModel);
                });

            inputPane.append(attrViews);
        } else {
            console.log("unsupported component type " + componentType);
        }
    });

    valueSelector.change();

    return view;
}

function renderValueAttributeUI(componentValueMetaModel, valueAttributeMetaModel) {
    const type = valueAttributeMetaModel.get("type");
    const view = $(
        "<div>" +
            "<div>" +
            valueAttributeMetaModel.get("type") + ":" +
            "</div>" +
        "</div>");

    const filedName =  componentValueMetaModel.get("code") + "." + valueAttributeMetaModel.get("type");

    if (type === TYPE_DATE) {
        // TODO: implement
    } else if (type === TYPE_AMOUNT) {
        view.append(
            "<input name='" + filedName + ".amount' />" +
            "<select name='" + filedName + ".currency'></select>");

        const dict = getExternalDictionary("CURRENCY");
        renderSelect(view.find("select"), dict);
    } else if (type === TYPE_DICT) {
        view.append("<select name='" + filedName + "'></select>");
        const dictType = valueAttributeMetaModel.get("dict");
        const dict = getExternalDictionary(dictType);
        renderSelect(view.find("select"), dict);
    } else if (type === TYPE_PERCENTAGE) {
        view.append("<input type='text' name='" + filedName + "' /> &percnt;");
    } else if (type === TYPE_SCALAR) {
        view.append("<input type='text' name='" + filedName + "' />");
    } else if (type === TYPE_PERIOD) {
        view.append(
            "<input name='" + filedName + ".period' />" +
            "<select name='" + filedName + ".unit'></select>");

        const dict = getExternalDictionary("PERIOD_UNIT");
        renderSelect(view.find("select"), dict);
    } else {
        console.log("unknown ");
    }

    view
        .find("input, select")
        .attr("data-type", "attr")
        .attr("data-value-code", componentValueMetaModel.get("code"))
        .attr("data-attr-key", valueAttributeMetaModel.get("key"));

    return view;
}

function isComponentIncludesInComposite(componentMetaModel, covenantMetaModel) {
    const code = componentMetaModel.get("code").toLowerCase();

    const res =  covenantMetaModel
        .get("components")
        .any((_componentMetaModel) => {
            if (!(_componentMetaModel.get("type") === "COMPOSITE")) {
                return false;
            }

            return _.any(_componentMetaModel.get("childs"), (item) => {
                return item.link && item.link.toLowerCase() === code;
            });
        });

    return res;
}

export {
    renderCovenantUI };
