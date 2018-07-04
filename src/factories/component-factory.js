import Component from "../view/component";

function componentFactory(data) {
    const component = new Component();

    if (data) {
        component.fromStore(data);
    }

    return component;
}

// TODO: implement
function componentModelFactory(data) {
    throw "Not implemented";
}

export {
    componentFactory,
    componentModelFactory};