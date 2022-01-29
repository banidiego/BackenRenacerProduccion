"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VariablesGlobales_1 = __importDefault(require("../VariablesGlobales"));
const validarJWT = (req, res, next) => {
    // Leer el Token
    let token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay Token en la petición',
        });
    }
    try {
        let datosJWT = jsonwebtoken_1.default.verify(token, VariablesGlobales_1.default);
        console.log(datosJWT.uid);
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }
};
exports.default = validarJWT;
