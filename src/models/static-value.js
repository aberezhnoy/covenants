import { Model } from "backbone";

class StaticValueModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: ""
        };
    }
}

export default StaticValueModel;
