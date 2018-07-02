import { Model } from "backbone";

class ComponentModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            code: "",
            name: "",
            defaultValues: []
        };
    }
}

export default ComponentModel;
