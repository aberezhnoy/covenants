import $ from "jquery";
import Covenant from "./view/covenant";

/*import { bindInputText, unbindInputText } from "./input-data-bind";
import { Model } from "backbone";

const mdl1 = new Model();
const inp1 = $("#inp1");
const inp2 = $("#inp2");
const inp3 = $("#inp3");

bindInputText(inp1, mdl1, "val1");
bindInputText(inp2, mdl1, "val1");
bindInputText(inp3, mdl1, "val1");

$("#my-btn").click(() => {
    console.log(mdl1.toJSON());
});*/

$(function() {
    const cov = new Covenant();

    cov
        .toElement()
        .appendTo("#index");


    $("#to-output").click(() => {
        $("#output").val(JSON.stringify(cov.toStore(), null, 2));
    });
});
