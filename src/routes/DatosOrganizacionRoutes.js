"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DatosOrganizacionController_1 = __importDefault(require("../controllers/DatosOrganizacionController"));
class DatosOrganizacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/CargarDatosOrganizacion/:Id_DatosOrganizacion', DatosOrganizacionController_1.default.CargarDatosOrganizacion);
        this.router.put('/:Id_DatosOrganizacion', DatosOrganizacionController_1.default.ActualizarDatosOrganizacion);
    }
}
exports.default = new DatosOrganizacionRoutes().router;
