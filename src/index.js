import $ from "jquery";
import "./lib/backbone-nested-models";
import Covenant from "./view/covenant";
import { attributeEditorInst } from "./view/attribute-editor/editor";

const covenantData = {
    name: "my name",
    code: "COV_1",
    required: "REQUIRED",
    components: [
        {
            code: "CMP_1",
            name: "Component 1",
            defaultValues: [
                {
                    code: "OPT_1",
                    name: "Option 1",
                    template: "процент: $v1",
                    attributes: [
                        {
                            key: "v1",
                            default: "45",
                            type: "PERCENTAGE"
                        }
                    ],
                    type: "TEMPLATE"
                },

                {
                    code: "OPT_2",
                    name: "Option 2",
                    default: "any value here",
                    type: "STATIC"
                }
            ]
        }
    ]
};

$(function() {
    const covenant = new Covenant();

    covenant
        .toElement()
        .appendTo("#index");

    attributeEditorInst.hide();

    attributeEditorInst
        .toElement()
        .appendTo("#tmpl-editor");

    $("#to-output").click(() => {
        $("#output").val(JSON.stringify(covenant.toStore(), null, 2));
    });

    $("#load").click(() => {
        $("#output").val("");
        covenant.fromStore(covenantData);
    });
});
