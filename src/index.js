import style from "./default.css";
import $ from "jquery";
import "./lib/backbone-nested-models";
import { covenantListView, componentListView } from "./view/views";
import { attributeEditorInst } from "./view/attribute-editor/editor";
import Backbone from "backbone";
import { CovenantCollection } from "./models/covenant";
import testCovData from "./resources/test-cov";
import testCovOutputData from "./resources/test-cov-out";

import { ConditionCollection } from "./client/models/condition";
import { renderCovenant } from "./client/client-renderer";
import { downloadFile, uploadFile } from "./file-utils";

Backbone.sync = function(method, model) {
    return false;
};


//const output = new ConditionCollection(testCovOutputData);
//console.log(output.toJSON());
//const testCovenantCollection = new CovenantCollection(testCovData);
const initialCovenantCollection = new CovenantCollection();

covenantListView.toElement().appendTo(".layout.default .covenant-list-container");
componentListView.toElement().appendTo(".layout.default .component-list-container");

covenantListView.setModel(initialCovenantCollection);

let curModel = initialCovenantCollection;

attributeEditorInst
    .toElement()
    .hide()
    .appendTo("#tmpl-editor");

$("#to-output").click(() => {
    $("#output").val(JSON.stringify(curModel.toJSON(), null, 2));
});

$("#load").click(() => {
    uploadFile().done(function(content) {
        const covenantData = JSON.parse(content);

        try {
            const covenantModel = new CovenantCollection(covenantData);
            covenantListView.setModel(covenantModel);
            curModel = covenantModel;
        } catch (e) {
            console.log("Error while creating CovenantCollection from JSON");
        }
    });
});

$("#download").click(() => {
    const jsonData = JSON.stringify(
        curModel.toJSON(),
        null,
        2);

    downloadFile("covenants.json", jsonData);
});