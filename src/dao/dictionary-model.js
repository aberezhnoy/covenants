import { Model, Collection } from "backbone";

class DictItem extends Model {
    get idAttribute() {
        return "value";
    }

    defaults() {
        return {
            title: "",
            value: ""
        };
    }
}

class Dictionary extends Collection {
    constructor(options) {
        super(options);
        this.model = DictItem;
    }
}

export { Dictionary, DictItem };
