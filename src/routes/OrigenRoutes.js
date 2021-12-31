"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrigenController_1 = __importDefault(require("../controllers/OrigenController"));
class OrigenRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/OrigenAnoIndice/:Ano/:Indice', OrigenController_1.default.OrigenAnoIndice);
        this.router.get('/OrigenAnoIdProyecto/:Ano/:Id_Proyecto', OrigenController_1.default.OrigenAnoIdProyecto);
        this.router.get('/DatosMenuInformacion/:Ano/:Nombre', OrigenController_1.default.OrigenAnoNombreProyecto);
        this.router.get('/MenuInformacion/:Ano', OrigenController_1.default.OrigenAno);
        this.router.get('/NombreOrigen/:TipoOrigen/:Origen/:Ano', OrigenController_1.default.NombreOrigenTipoOrigenOrigenAno);
    }
}
exports.default = new OrigenRoutes().router;
