"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', AuthController_1.default.Login);
        this.router.get('/RenewToken', validar_jwt_1.default, AuthController_1.default.RenewToken);
    }
}
exports.default = new AuthRoutes().router;
