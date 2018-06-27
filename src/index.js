import $ from "jquery";
import Covenant from "./covenant.js";

$(function() {
    let cov = new Covenant("any name", "financial", "REQUIRED");
    $("#index").append(cov.toElement());
});
