"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlanContableController_1 = __importDefault(require("../controllers/PlanContableController"));
class PlanContableRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/FiltrarCodigo/:Codigo_PlanCuenta/:Ano', PlanContableController_1.default.ListaCodigoPlanCuentaAno);
        this.router.get('/Lista/:Ano', PlanContableController_1.default.ListaAno);
        this.router.post('/', PlanContableController_1.default.GuardarPlanContable);
    }
}
exports.default = new PlanContableRoutes().router;
