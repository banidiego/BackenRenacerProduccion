"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OperacionPrincipalController_1 = __importDefault(require("../controllers/OperacionPrincipalController"));
class OperacionPrincipalRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/AsientosMes/:Ano/:Mes/:TipoOrigen/:Id_Proyecto', OperacionPrincipalController_1.default.ListaMensualAnoMesTipoOrigen);
        this.router.get('/DatosMenuInformacion/:Ano/:Nombre', OperacionPrincipalController_1.default.ListaAnoNombreProyecto);
        this.router.get('/:Id', OperacionPrincipalController_1.default.ListaIdOperacionPrincipal);
        this.router.get('/MenuInformacion/:Ano', OperacionPrincipalController_1.default.ListaAno);
        this.router.get('/', OperacionPrincipalController_1.default.OperacionesPricipalesNoCuadradas);
        this.router.get('/NumeroOperacion/:TipoOrigen/:Ano/:Mes/:Id_Proyecto', OperacionPrincipalController_1.default.MaxNumeroOperacion);
        this.router.get('/ActualizarLibroDiarioSimplificado/:Id_OperacionPrincipal', OperacionPrincipalController_1.default.ActualizarLibroDiarioSimplificado);
        this.router.post('/', OperacionPrincipalController_1.default.GuardarOperacionPrincipal);
        this.router.put('/:id', OperacionPrincipalController_1.default.ActualizarOperacionPrincipal);
    }
}
exports.default = new OperacionPrincipalRoutes().router;
