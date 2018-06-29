import { Model, Collection } from 'backbone';

class DictItem extends Model {
    defaults() {
        return {
            title: "",
            value: ""
        };
    }
}

export default DictItem;

class MyDict1 extends Collection {
    constructor(options) {
        super(options);
        this.model = DictItem;
    }
}

export { MyDict1 };
