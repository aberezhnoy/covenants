import { Model } from "backbone";

class TemplateValueModel extends Model {
    get idAttribute() {
        return "code";
    }

    defaults() {
        return {
            name: "",
            code: "",
            template: "",
            defaultValues: []
        };
    }
}

export default TemplateValueModel;
