function renderCovenant(covenantMetaModel, conditionModel) {
    return replacePlaceholders(covenantMetaModel.get("cdTemplate"), (placeholderName) => {
        const componentMetaModel = covenantMetaModel
            .get("components")
            .get(placeholderName);

        const conditionComponentModel = conditionModel
            .get("components")
            .get(placeholderName);

        return renderComponent(componentMetaModel, conditionComponentModel);
    });
}

function renderComponent(componentMetaModel, conditionComponentModel) {
    /*return replacePlaceholders(componentMetaModel.get("cdTemplate"), (placeholderName) => {

    });*/
    const componentValueMetaModel = componentMetaModel
        .get("defaultValues")
        .get(conditionComponentModel);

    //const template = componentValueMetaModel.get("cdTemplate");

    return renderComponentValue(componentValueMetaModel, );
}

function renderComponentValue(componentValueMetaModel, valueModel) {
    //
}

/*function traverseTemplate(template, callback) {
    const re = /\$([a-zа-я0-9_]+)/ig;
    let item;

    while ((item = re.exec(template)) !== null) {
        const placeholderName = item[1];

        callback(placeholderName);
    }
}

function getPlaceholderNames(template) {
    let placeholderNames = [];

    traverseTemplate(template, (placeholderName) => {
        placeholderNames.push(placeholderName);
    });

    return placeholderNames;
}*/

function replacePlaceholders(template, callback) {
    const re = /\$([a-zа-я0-9_]+)/ig;

    return template.replace(re, (match, placeholderName, offset, string) => {
        return callback(placeholderName);
    });
}

export {
    renderCovenant };
