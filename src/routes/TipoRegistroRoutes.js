"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TipoRegistroController_1 = __importDefault(require("../controllers/TipoRegistroController"));
class TipoRegistroRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TipoRegistroController_1.default.Lista);
    }
}
exports.default = new TipoRegistroRoutes().router;
