import $ from "jquery";
import Covenant from "./covenant.js";
import MyDict1 from "./dao/data-source-dict";

const x = new MyDict1([
    {
        value: "test",
        title: "my title"
    }
]);

console.log(x.toJSON());

/*$(function() {
    let cov = new Covenant("any name", "financial", "REQUIRED");
    $("#index").append(cov.toElement());
});*/
