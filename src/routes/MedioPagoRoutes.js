"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MedioPagoController_1 = __importDefault(require("../controllers/MedioPagoController"));
class MedioPagoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', MedioPagoController_1.default.Lista);
    }
}
exports.default = new MedioPagoRoutes().router;
