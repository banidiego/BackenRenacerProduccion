"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const ReportesGlobalesController_1 = __importDefault(require("../controllers/ReportesGlobalesController"));
class ReportesGlobalesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/VentasGastosMesAnoIdEmpresaBannys/:Mes/:Ano/:Fecha/:Id_Empresa', validar_jwt_1.default, ReportesGlobalesController_1.default.VentasGastosMesAnoIdEmpresaBannys);
        this.router.get('/GastosVentasUtilidadesMensuales/:Id_Empresa/:Bannys', validar_jwt_1.default, ReportesGlobalesController_1.default.GastosVentasUtilidadesMensuales);
        this.router.get('/GastosVentasUtilidadesDiarios/:Id_Empresa/:Bannys', validar_jwt_1.default, ReportesGlobalesController_1.default.GastosVentasUtilidadesDiarios);
    }
}
exports.default = new ReportesGlobalesRoutes().router;
