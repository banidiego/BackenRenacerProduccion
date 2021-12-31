"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MateriaPrimaController_1 = __importDefault(require("../controllers/MateriaPrimaController"));
class MateriaPrimaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaTablaMateriaPrimaIdEmpresa/:Id_Empresa', MateriaPrimaController_1.default.ListaTablaMateriaPrimaId_Empresa);
        this.router.get('/ListaMateriaPrimaIdEmpresa/:Id_Empresa', MateriaPrimaController_1.default.ListaMateriaPrimaId_Empresa);
        this.router.get('/MateriaPrimaDescripcion_MateriaPrimaIdEmpresa/:Descripcion_MateriaPrima/:Id_Empresa', MateriaPrimaController_1.default.MateriaPrimaDescripcionId_Empresa);
        this.router.get('/MateriaPrimaId_MateriaPrimaIdEmpresa/:Id_MateriaPrima/:Id_Empresa', MateriaPrimaController_1.default.MateriaPrimaId_MateriaPrimaId_Empresa);
        this.router.post('/', MateriaPrimaController_1.default.GuardarMateriaPrima);
        this.router.put('/:id', MateriaPrimaController_1.default.ActualizarMateriaPrima);
        this.router.delete('/:id', MateriaPrimaController_1.default.EliminarMateriaPrima);
    }
}
exports.default = new MateriaPrimaRoutes().router;
