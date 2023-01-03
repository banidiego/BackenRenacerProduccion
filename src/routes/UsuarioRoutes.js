"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = __importDefault(require("../controllers/UsuarioController"));
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', UsuarioController_1.default.Lista);
        this.router.get('/:id', UsuarioController_1.default.UsuarioId);
        this.router.post('/', UsuarioController_1.default.GuardarUsuario);
        this.router.put('/:id', UsuarioController_1.default.ActualizarUsuario);
        this.router.delete('/:id', UsuarioController_1.default.EliminarUsuario);
    }
}
exports.default = new UsuarioRoutes().router;
