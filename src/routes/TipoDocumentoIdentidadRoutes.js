"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TipoDocumentoIdentidadController_1 = __importDefault(require("../controllers/TipoDocumentoIdentidadController"));
class TipoDocumentoIdentidadRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TipoDocumentoIdentidadController_1.default.Lista);
        this.router.get('/FiltrarTipoDocumento/:Codigo_TipoDocumentoIdentidad', TipoDocumentoIdentidadController_1.default.TipoDocumentoIdentidadCodigo);
    }
}
exports.default = new TipoDocumentoIdentidadRoutes().router;
