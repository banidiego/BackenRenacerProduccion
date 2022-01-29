"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ManoObraController_1 = __importDefault(require("../controllers/ManoObraController"));
class ManoObraRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaManoObraIdEmpresa/:Id_Empresa', ManoObraController_1.default.ListaManoObraId_Empresa);
        this.router.get('/SumaManoObraIdEmpresa/:Id_Empresa', ManoObraController_1.default.SumaManoObraId_Empresa);
        this.router.post('/', ManoObraController_1.default.GuardarManoObra);
        this.router.put('/:id', ManoObraController_1.default.ActualizarManoObra);
        this.router.delete('/:id', ManoObraController_1.default.EliminarManoObra);
    }
}
exports.default = new ManoObraRoutes().router;
