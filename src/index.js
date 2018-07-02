import $ from "jquery";
import Covenant from "./view/covenant";

import { TemplateValueAttributesCollection } from "./models/template-value";

const x = new TemplateValueAttributesCollection([
    {
        type: "PERCENTAGE",
        key: "k1",
        default: 56
    }
]);

console.log(x.toJSON());

/*$(function() {
    const cov = new Covenant();

    cov
        .toElement()
        .appendTo("#index");


    $("#to-output").click(() => {
        $("#output").val(JSON.stringify(cov.toStore(), null, 2));
    });
});*/
