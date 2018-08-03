import $ from "jquery";

function renderCovenantUI(covenantMetaModel) {
    const componentViews = covenantMetaModel.map((componentMetaModel) => {
        return renderComponentUI(componentMetaModel);
    });

    return $("<div></div>").append(componentViews);
}

function renderComponentUI(componentMetaModel) {
    const type = componentMetaModel.get("type");
    const view = $("<div></div>");

    if (type === "STD") {

    } else {
        view.text("not implemented"); // TODO: implement
    }

    return view;
}

export {
    renderCovenantUI };
