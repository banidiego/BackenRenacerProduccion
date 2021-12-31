"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OperacionController_1 = __importDefault(require("../controllers/OperacionController"));
class OperacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/Asiento/:Id_OperacionPrincipal', OperacionController_1.default.ListaOperacionPrincipal);
        this.router.get('/RegistroGasto/:Id_DetalleSR', OperacionController_1.default.ListaOperacionIdDetalleSRRegistroGasto);
        this.router.get('/SR/:Id_SR', OperacionController_1.default.ListaId_SR);
        this.router.get('/SRTipo3/:Id_SR', OperacionController_1.default.OperacionTipoSR3);
        this.router.post('/', OperacionController_1.default.GuardarOperacion);
        this.router.put('/:id', OperacionController_1.default.ActualizarOperacion);
        this.router.delete('/:id', OperacionController_1.default.EliminarOperacion);
    }
}
exports.default = new OperacionRoutes().router;
