"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriaController_1 = __importDefault(require("../controllers/CategoriaController"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class CategoriaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/ListaCategoriaIdEmpresa/:Id_Empresa', validar_jwt_1.default, CategoriaController_1.default.ListaCategoriaIdEmpresa);
    }
}
exports.default = new CategoriaRoutes().router;
