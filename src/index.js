import $ from "jquery";
import Covenant from "./view/covenant";
import { attributeEditorInst } from "./view/attribute-editor/editor";

$(function() {
    const covenant = new Covenant();

    covenant
        .toElement()
        .appendTo("#index");

    attributeEditorInst
        .toElement()
        .appendTo("#tmpl-editor");

    attributeEditorInst.fromStore([
        {
            type: "SCALAR",
            key: "k1",
            default: "hey hy"
        }
    ]);

    $("#to-output").click(() => {
        $("#output").val(JSON.stringify(covenant.toStore(), null, 2));
    });
});
