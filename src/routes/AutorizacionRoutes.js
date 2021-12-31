"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AutorizacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // this.router.post('/', AutorizacionController);
    }
}
exports.default = new AutorizacionRoutes().router;
