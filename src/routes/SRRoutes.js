"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SRController_1 = __importDefault(require("../controllers/SRController"));
class SRRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/SolicitudesMes/:Ano/:Mes/:Id_Proyecto', SRController_1.default.ListaAnoMesIdProyecto);
        this.router.get('/SolicitudesRendir/:Id_Proyecto', SRController_1.default.SolicitudesRendir);
        this.router.get('/NumeroSolicitud/:Ano/:Id_Proyecto', SRController_1.default.MaximoNumeroSolicitud);
        this.router.get('/:Id_SR', SRController_1.default.ListaIdSR);
        this.router.post('/', SRController_1.default.GuardarSR);
        this.router.put('/:id', SRController_1.default.ActualizarSR);
    }
}
exports.default = new SRRoutes().router;
