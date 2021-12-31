"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VariablesGlobales_1 = __importDefault(require("../VariablesGlobales"));
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };
        jsonwebtoken_1.default.sign(payload, VariablesGlobales_1.default, {
            expiresIn: '12h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generarJWT;
