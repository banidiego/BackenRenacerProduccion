"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuxiliarController_1 = __importDefault(require("../controllers/AuxiliarController"));
class AuxiliarRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/FiltrarRUC/:Ruc', AuxiliarController_1.default.ListaAuxiliaresRUC);
        this.router.get('/FiltrarRazonSocial/:RazonSocial', AuxiliarController_1.default.ListaAuxiliaresRazonSocial);
        this.router.get('/', AuxiliarController_1.default.ListaAuxiliares);
        this.router.post('/', AuxiliarController_1.default.GuardarAuxiliar);
        this.router.put('/:id', AuxiliarController_1.default.ActualizarAuxiliar);
        this.router.delete('/:id', AuxiliarController_1.default.EliminarAuxiliar);
    }
}
exports.default = new AuxiliarRoutes().router;
