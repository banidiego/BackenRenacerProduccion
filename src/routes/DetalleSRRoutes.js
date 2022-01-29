"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DetalleSRController_1 = __importDefault(require("../controllers/DetalleSRController"));
class DetalleSRRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaDetalleSR/:Id_SR', DetalleSRController_1.default.ListaDetalleSRIdSR);
        this.router.get('/Totales/:Id_SR', DetalleSRController_1.default.SumaTotalGastoIdSR);
        this.router.get('/DetalleSR/:Id_DetalleSR', DetalleSRController_1.default.ListaDetalleSRIdDetalleSR);
        this.router.post('/', DetalleSRController_1.default.GuardarDetalleSR);
        this.router.put('/:id', DetalleSRController_1.default.ActualizarDetalleSR);
        this.router.delete('/:id', DetalleSRController_1.default.EliminarDetalleSR);
    }
}
exports.default = new DetalleSRRoutes().router;
