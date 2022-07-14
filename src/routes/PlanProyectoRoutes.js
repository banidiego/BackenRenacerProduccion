"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlanProyectoController_1 = __importDefault(require("../controllers/PlanProyectoController"));
class PlanProyectoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/FiltrarRUC/:Ruc', PlanProyectoController_1.default.ListaCodigoPlanProyecto);
        this.router.get('/Lista/:Ano/:Id_Proyecto', PlanProyectoController_1.default.ListaAnoCodigoProyecto);
        this.router.get('/ActualizarValoresPlanProyecto/:Id_Proyecto/:Ano', PlanProyectoController_1.default.ActualizarValoresPlanProyecto);
        this.router.post('/', PlanProyectoController_1.default.GuardarPlanProyecto);
    }
}
exports.default = new PlanProyectoRoutes().router;
