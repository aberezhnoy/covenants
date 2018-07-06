import { Model } from "backbone";

class CovenantModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            type: "",
            required: "NOT_REQUIRED",
            cdTemplate: "",
            components: []
        };
    }
}

export default CovenantModel;
