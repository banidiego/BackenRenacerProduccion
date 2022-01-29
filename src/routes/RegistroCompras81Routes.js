"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RegistroCompras81Controller_1 = __importDefault(require("../controllers/RegistroCompras81Controller"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class RegistroCompras81Routes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/UltimoCorrelativo/:Ano/:Mes/:Id_Empresa', validar_jwt_1.default, RegistroCompras81Controller_1.default.UltimoCorrelativo);
        this.router.get('/RegistrosFechaIdEmpresa/:Fecha/:Id_Empresa', validar_jwt_1.default, RegistroCompras81Controller_1.default.RegistrosFechaIdEmpresa);
        this.router.get('/SumaRegistrosFechaIdEmpresa/:Fecha/:Id_Empresa', validar_jwt_1.default, RegistroCompras81Controller_1.default.SumaRegistrosFechaIdEmpresa);
        this.router.get('/ListadoDiarioMesAnoIdEmpresa/:Mes/:Ano/:Id_Empresa', validar_jwt_1.default, RegistroCompras81Controller_1.default.ListadoDiarioMesAnoIdEmpresa);
        this.router.get('/RegistroIdRegistro/:Id_Registro', validar_jwt_1.default, RegistroCompras81Controller_1.default.RegistroIdRegistro);
        this.router.get('/GastosMensuales/:Bannys', validar_jwt_1.default, RegistroCompras81Controller_1.default.GastosMensuales);
        this.router.get('/GastosDiarios/:Id_Empresa/:Bannys', validar_jwt_1.default, RegistroCompras81Controller_1.default.GastosDiarios);
        this.router.get('/ReporteCompras81/:Id_Empresa/:Mes/:Ano', validar_jwt_1.default, RegistroCompras81Controller_1.default.ReporteGasto81);
        this.router.get('/ReporteCompras81CSV/:Id_Empresa/:Ano/:Mes', RegistroCompras81Controller_1.default.DescargarReporte);
        this.router.post('/ComprasPeriodo/:Id_Empresa/:Bannys', validar_jwt_1.default, RegistroCompras81Controller_1.default.ComprasPeriodo);
        this.router.post('/', validar_jwt_1.default, RegistroCompras81Controller_1.default.GuardarRegistroCompra);
        this.router.put('/:id', validar_jwt_1.default, RegistroCompras81Controller_1.default.ActualizarRegistroCompra);
        this.router.delete('/:id', validar_jwt_1.default, RegistroCompras81Controller_1.default.EliminarRegistroCompra);
    }
}
exports.default = new RegistroCompras81Routes().router;
