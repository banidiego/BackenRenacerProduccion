"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VariablesSesionController_1 = __importDefault(require("../controllers/VariablesSesionController"));
class VariablesSesionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/CargaDatos/:id', VariablesSesionController_1.default.VariableSesionId);
        this.router.put('/:id', VariablesSesionController_1.default.ActualizarVariableSesion);
    }
}
exports.default = new VariablesSesionRoutes().router;
