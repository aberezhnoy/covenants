import $ from "jquery";
import Covenant from "./view/covenant";
import { attributeEditorInst } from "./view/attribute-editor/editor";
/*
import { Model } from "backbone";

class Model2 extends Model {
    defaults() {
        return {
            k1: "v1",
            k2: 66
        }
    }
}

class Model3 extends Model2 {
    defaults() {
        return {
            ...super.defaults(),
            k2: 77,
            k3: true
        }
    }
}

console.log(new Model3().toJSON());*/

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
