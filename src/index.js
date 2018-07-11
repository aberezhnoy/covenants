import $ from "jquery";
import "./lib/backbone-nested-models";
import Covenant from "./view/covenant";
import { attributeEditorInst } from "./view/attribute-editor/editor";
import Backbone from "backbone";
import CovenantModel from "./models/covenant";
import style from "./default.css";

Backbone.sync = function(method, model) {
    return false;
};

const covenantData = {
    name: "my name",
    code: "COV_1",
    required: "REQUIRED",
    components: [
        {
            code: "CMP_1",
            name: "Component 1",
            type: "STD",
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

const covenantModel = new CovenantModel(covenantData);
const covenant = new Covenant();

covenant
    .toElement()
    .appendTo("#index");

attributeEditorInst.hide();

attributeEditorInst
    .toElement()
    .appendTo("#tmpl-editor");

$("#to-output").click(() => {
    $("#output").val(JSON.stringify(covenantModel.toJSON(), null, 2));
});

$("#load").click(() => {
    $("#output").val("");
    covenant.setModel(covenantModel);
});
