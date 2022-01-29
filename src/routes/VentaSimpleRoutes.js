"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VentaSimpleController_1 = __importDefault(require("../controllers/VentaSimpleController"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class VentaSimpleRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/VentasSimplesMesAnoIdEmpresa/:Mes/:Ano/:Id_Empresa', validar_jwt_1.default, VentaSimpleController_1.default.VentasMesAnoIdEmpresa);
        this.router.get('/RegistrosFechaIdEmpresa/:Fecha/:Id_Empresa', validar_jwt_1.default, VentaSimpleController_1.default.RegistrosFechaIdEmpresa);
        this.router.get('/SumaRegistrosFechaIdEmpresa/:Fecha/:Id_Empresa', validar_jwt_1.default, VentaSimpleController_1.default.SumaRegistrosFechaIdEmpresa);
        this.router.get('/VentasDiaFechaIdEmpresa/:Fecha/:Id_Empresa/:Bannys', validar_jwt_1.default, VentaSimpleController_1.default.VentasDiaFechaIdEmpresa);
        this.router.get('/VentasSimplesMesAnoIdEmpresa/:Mes/:Ano/:Id_Empresa', VentaSimpleController_1.default.VentasMesAnoIdEmpresa);
        this.router.get('/VentasMensuales/:Id_Empresa/:Bannys', validar_jwt_1.default, VentaSimpleController_1.default.VentasMensuales);
        this.router.get('/VentasDiarias/:Id_Empresa/:Bannys', validar_jwt_1.default, VentaSimpleController_1.default.VentasDiarias);
        this.router.post('/', validar_jwt_1.default, VentaSimpleController_1.default.GuardarVentaSimple);
        this.router.post('/VentasPeriodo/:Id_Empresa/:Bannys', validar_jwt_1.default, VentaSimpleController_1.default.VentasPeriodo);
        this.router.put('/:id', validar_jwt_1.default, VentaSimpleController_1.default.ActualizarVentaSimple);
        this.router.delete('/:id', validar_jwt_1.default, VentaSimpleController_1.default.EliminarVentaSimple);
    }
}
exports.default = new VentaSimpleRoutes().router;
