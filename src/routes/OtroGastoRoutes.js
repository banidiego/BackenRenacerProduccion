"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OtroGastoController_1 = __importDefault(require("../controllers/OtroGastoController"));
class OtroGastoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaOtroGastoIdEmpresa/:Id_Empresa', OtroGastoController_1.default.ListaOtroGastoId_Empresa);
        this.router.get('/SumaOtroGastoIdEmpresa/:Id_Empresa', OtroGastoController_1.default.SumaOtroGastoId_Empresa);
        this.router.post('/', OtroGastoController_1.default.GuardarOtroGasto);
        this.router.put('/:id', OtroGastoController_1.default.ActualizarOtroGasto);
        this.router.delete('/:id', OtroGastoController_1.default.EliminarOtroGasto);
    }
}
exports.default = new OtroGastoRoutes().router;
