"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TipoComprobanteController_1 = __importDefault(require("../controllers/TipoComprobanteController"));
class TipoComprobanteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TipoComprobanteController_1.default.Lista);
        this.router.get('/FiltrarTipoDocumento/:Codigo_TipoDocumento', TipoComprobanteController_1.default.TipoDocumentoCodigo);
        this.router.get('/:id', TipoComprobanteController_1.default.TipoDocumentoId);
        this.router.post('/', TipoComprobanteController_1.default.Guardar);
        this.router.put('/:id', TipoComprobanteController_1.default.Actualizar);
        this.router.delete('/:id', TipoComprobanteController_1.default.Eliminar);
    }
}
exports.default = new TipoComprobanteRoutes().router;
