import { Collection, Model } from "backbone";

class TemplateValueModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            template: "",
            attributes: []
        };
    }
}

export default TemplateValueModel;