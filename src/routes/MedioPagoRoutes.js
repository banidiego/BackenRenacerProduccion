"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MedioPagoController_1 = __importDefault(require("../controllers/MedioPagoController"));
class MedioPagoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', MedioPagoController_1.default.Lista);
        this.router.get('/:id', MedioPagoController_1.default.MedioPagoId);
        this.router.post('/', MedioPagoController_1.default.Guardar);
        this.router.put('/:id', MedioPagoController_1.default.Actualizar);
        this.router.delete('/:id', MedioPagoController_1.default.Eliminar);
    }
}
exports.default = new MedioPagoRoutes().router;
