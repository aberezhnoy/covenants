import { CovenantModel } from "../models/covenant";
import Covenant from "../view/covenant/covenant";

function covenantFactory(covenantModel) {
    const inst = new Covenant();
    inst.setModel(covenantModel);

    return inst;
}

function covenantModelFactory(data) {
    return new CovenantModel(data);
}

export {
    covenantFactory,
    covenantModelFactory };