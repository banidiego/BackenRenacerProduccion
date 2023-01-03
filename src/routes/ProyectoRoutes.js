"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProyectoController_1 = __importDefault(require("../controllers/ProyectoController"));
const ProyectoController_2 = __importDefault(require("../controllers/ProyectoController"));
class ProyectoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaProyectos', ProyectoController_1.default.ListaProyectos);
        this.router.get('/ProyectoActual/:Id_Proyecto', ProyectoController_1.default.ProyectoIdProyecto);
        this.router.post('/', ProyectoController_1.default.GuardarProyecto);
        this.router.put('/:id', ProyectoController_2.default.ActualizarProyecto);
    }
}
exports.default = new ProyectoRoutes().router;
