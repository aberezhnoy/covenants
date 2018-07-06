import $ from "jquery";
import { Collection, Model } from 'backbone';

function renderSelect(elem, collection) {
    let optionList = collection.map(function(item) {
        return new Option(item.get("title"), item.get("value"));
    });

    $(elem)
        .empty()
        .append(optionList);
}

function bindDictionary(elem, collection) {
    if (!(collection instanceof Collection)) {
        throw "Could't bind not a collection to `Select`";
    }

    collection.on("update", function(collection) {
        renderSelect(elem, collection);
    }, elem);

    renderSelect(elem, collection);
}

function unbindDictionary(elem, collection) {
    if (!(collection instanceof Collection)) {
        throw "Could't bind not a collection to `Select`";
    }

    collection.off("update", null, elem);
}

function bindInputText(elem, model, propName) {
    if (!(model instanceof Model)) {
        throw "Could't bind not a model to `Text`";
    }

    const $elem = $(elem);
    let silent = false;

    model.on("change:" + propName, function(model, newValue, p3) {
        if (silent === false) {
            console.log("Updating value for", elem);
            $elem.val(newValue);
        }

        silent = false;
    }, elem);

    elem._changeHandler = () => {
        silent = true;
        model.set(propName, $elem.val());
    };

    $elem
        .on("change", elem._changeHandler)
        .val(model.get(propName));
}

function unbindInputText(elem, model, propName) {
    if (!(model instanceof Model)) {
        throw "Could't unbind not a model to `Text`";
    }

    const $elem = $(elem);

    $elem.off("change", elem._changeHandler);
    model.off("change:" + propName, null, elem);
}

const bindInputValue = function(elem, model, propName) {
    return bindInputText(elem, model, propName);
};

const unbindInputValue = function(elem, model, propName) {
    return unbindInputText(elem, model, propName);
};

export {
    bindDictionary,
    unbindDictionary,
    bindInputText,
    unbindInputText,
    bindInputValue,
    unbindInputValue };
