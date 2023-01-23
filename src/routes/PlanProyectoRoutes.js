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
        this.router.get('/Todos/:Ano/:Id_Proyecto', PlanProyectoController_1.default.ListaTodosAnoIdProyecto);
        this.router.get('/PlanProyectoIdProyecto/:Id_PlanProyecto', PlanProyectoController_1.default.PlanProyectoIdPlanProyecto);
        this.router.get('/ActualizarValoresPlanProyecto/:Id_Proyecto/:Ano', PlanProyectoController_1.default.ActualizarValoresPlanProyecto);
        this.router.get('/GastosBancarios/:Ano/:Id_Proyecto/:Mes/:Codigo_PlanProyecto', PlanProyectoController_1.default.GastoBancarioMensual);
        this.router.get('/GastoAcumuladoMensual/:Ano/:Id_Proyecto/:Mes/:Codigo_PlanProyecto', PlanProyectoController_1.default.GastoAcumuladoMensual);
        this.router.post('/', PlanProyectoController_1.default.GuardarPlanProyecto);
        this.router.put('/:id', PlanProyectoController_1.default.ActualizarPlanProyecto);
        this.router.delete('/:id', PlanProyectoController_1.default.EliminarPlanProyecto);
    }
}
exports.default = new PlanProyectoRoutes().router;
