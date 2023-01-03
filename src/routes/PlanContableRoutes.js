"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlanContableController_1 = __importDefault(require("../controllers/PlanContableController"));
const PlanContableController_2 = __importDefault(require("../controllers/PlanContableController"));
class PlanContableRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/FiltrarCodigo/:Codigo_PlanCuenta/:Ano', PlanContableController_1.default.ListaCodigoPlanCuentaAno);
        this.router.get('/FiltrarId/:Id_PlanContable', PlanContableController_1.default.ListaIdPlanCuenta);
        this.router.get('/Lista/:Ano', PlanContableController_1.default.ListaAno);
        this.router.get('/ListaTodo/:Ano', PlanContableController_1.default.ListaAnoTodo);
        this.router.get('/ActualizarValoresPlanContable/:Ano', PlanContableController_2.default.ActualizarValoresPlanContable);
        this.router.post('/', PlanContableController_1.default.GuardarPlanContable);
        this.router.put('/:id', PlanContableController_2.default.ActualizarPlanContable);
        this.router.delete('/:id', PlanContableController_2.default.EliminarPlanContable);
    }
}
exports.default = new PlanContableRoutes().router;
