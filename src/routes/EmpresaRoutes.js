"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmpresaController_1 = __importDefault(require("../controllers/EmpresaController"));
class EmpresaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaEmpresas/', EmpresaController_1.default.ListaEmpresas);
        this.router.get('/ListaEmpresasUsuario/:Id_Usuario', EmpresaController_1.default.ListaEmpresasUsuario);
        this.router.get('/LoginEmpresasId_Usuario/:Id_Usuario', EmpresaController_1.default.ListaEmpresasIdUsuario);
        this.router.get('/EmpresasNombreEmpresa/:Nombre', EmpresaController_1.default.EmpresaNombreEmpresa);
    }
}
exports.default = new EmpresaRoutes().router;
