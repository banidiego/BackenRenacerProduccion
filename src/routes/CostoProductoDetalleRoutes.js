"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CostoProductoDetalleController_1 = __importDefault(require("../controllers/CostoProductoDetalleController"));
class CostoProductoDetalleRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaCostoProductoDetalle/:Id_CostoProducto', CostoProductoDetalleController_1.default.ListaCostoProductoIdCostoProducto);
        this.router.get('/CostoProductoDetalleId/:Id_CostoProductoDetalle', CostoProductoDetalleController_1.default.CostoProductoDetalleId);
        this.router.get('/TablaCostoProductoDetalles/:Id_CostoProducto', CostoProductoDetalleController_1.default.TablaCostoProductoDetalle);
        this.router.get('/SumaTablaCostoProductoDetalles/:Id_CostoProducto', CostoProductoDetalleController_1.default.SumaListaCostoProductoIdCostoProducto);
        this.router.post('/', CostoProductoDetalleController_1.default.GuardarCostoProductoDetalle);
        this.router.put('/:Id_CostoProductoDetalle', CostoProductoDetalleController_1.default.ActualizarCostoProductoDetalle);
    }
}
exports.default = new CostoProductoDetalleRoutes().router;
