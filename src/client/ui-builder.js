import $ from "jquery";
import _ from "underscore";

function renderCovenantUI(covenantMetaModel) {
    const view = $(
        "<div style='background-color: #F0F0F0; padding: 10px;'>" +
            "<div class='compts'></div>" +
            "<div><button class='do-print'>print</button></div>" +
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
            const inputs = view.find("input, select");

            const output = {
                code: covenantMetaModel.get("code"),
                components: []
            };

            const components = output.components;

            _.forEach(inputs, (input) => {
                const val = $(input).val();
                const code = $(input).attr("data-code");

                const componentMetaModel = covenantMetaModel
                    .get("components")
                    .get(code);



                components.push({
                    code: code,
                    value: {

                    }
                });
            });

            console.log(output);
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
            "<select class='component-value-selector'></select>" +
            "<div class='template-input-pane' style='margin-left: 10px;'></div>" +
        "</div>");

    const valueSelector = view.find(".component-value-selector");
    const inputPane = view.find(".template-input-pane");

    valueSelector
        .attr("name", "components." + componentMetaModel.get("code"))
        .attr("data-code", componentMetaModel.get("code"));

    valueSelector.change(() => {
        const code = valueSelector.val();
        const componentValueMetaModel = componentMetaModel
            .get("defaultValues")
            .get(code);

        const attrViews = componentValueMetaModel
            .get("attributes")
            .map((valueAttributeMetaModel) => {
                return renderValueAttributeUI(valueAttributeMetaModel);
            });

        inputPane
            .empty()
            .append(attrViews);
    });

    componentMetaModel.get("defaultValues").forEach((componentValueMetaModel) => {
        valueSelector.append(
            "<option value='" +
            componentValueMetaModel.get("code") +
            "'>" +
            componentValueMetaModel.get("name") +
            "</option>");
    });

    return view;
}

function renderValueAttributeUI(valueAttributeMetaModel) {
    const view = $(
        "<div>" +
            valueAttributeMetaModel.get("key") + ": " +
            valueAttributeMetaModel.get("type") +
        "</div>");

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

            const c = _componentMetaModel.get("childs");

            const x = _.any(c, (item) => {
                return item.link && item.link.toLowerCase() === code;
            });

            return x;

        });

    return res;
}

export {
    renderCovenantUI };
