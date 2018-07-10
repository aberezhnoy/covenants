import { Model } from "backbone";

function parseCompositeComponentNotation(expression) {
    const re = /\$([a-z0-9_]+)|(and)|(or)|\(+|\)+/ig;
    let item;
    const result = [];

    while ((item = re.exec(expression)) !== null) {
        const componentName = item[1];
        const andOperator = item[2];
        const orOperator = item[3];

        if (componentName) {
            result.push({
                link: componentName
            });
        } else if (andOperator) {
            result.push({
                operator: "and"
            });
        } else if (orOperator) {
            result.push({
                operator: "or"
            });
        }
    }

    return result;
}

class CompositeComponentModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            code: "",
            name: "",
            childs: [],
            type: "COMPOSITE",
            childsText: ""
        };
    }

    initialize() {
        super.initialize();

        this.on("change:childsText", (model, newValue) => {
            this.set("childs", parseCompositeComponentNotation(newValue));
        });
    }

    getType() {
        return this.get("type");
    }
}

export default CompositeComponentModel;

export { parseCompositeComponentNotation };