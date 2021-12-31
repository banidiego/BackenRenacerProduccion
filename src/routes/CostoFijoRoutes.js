"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CostoFijoController_1 = __importDefault(require("../controllers/CostoFijoController"));
class CostoFijoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/CostoFijoIdEmpresa/:Id_Empresa', CostoFijoController_1.default.ObtenerCostoFijoIdEmpresa);
        this.router.put('/ActualizarCostoFijo/:Id_CostoFijo/:Id_Empresa', CostoFijoController_1.default.ActualizarCostoFijo);
    }
}
exports.default = new CostoFijoRoutes().router;
