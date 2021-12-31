"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CostoProductoController_1 = __importDefault(require("../controllers/CostoProductoController"));
class CostoProductoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaCostoProducto/:Id_Empresa', CostoProductoController_1.default.ListaCostoProductoIdEmpresa);
        this.router.get('/CostoProducto/:Id_CostoProducto/:Id_Empresa', CostoProductoController_1.default.ObtenerCostoProductoIdCostoIdEmpresa);
        this.router.post('/', CostoProductoController_1.default.GuardarCostoProducto);
        // this.router.put(
        //   '/ActualizarCostoFijo/:Id_CostoFijo/:Id_Empresa',
        //   costoFijoController.ActualizarCostoFijo
        // );
    }
}
exports.default = new CostoProductoRoutes().router;
