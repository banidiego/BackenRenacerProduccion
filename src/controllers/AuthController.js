"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
class AuthController {
    // ==========================================
    // Comprobar Contraseña
    // ==========================================
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var body = req.body;
            yield database_1.default.query('SELECT * FROM Usuario WHERE Usuario = ? and Password=?', [body.Usuario, body.Password], function (err, datos, fields) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error filtrando Auxiliar',
                            errors: err,
                        });
                    }
                    // Comprueba si existen registros
                    const count = datos.length;
                    if (count) {
                        // Generar Token
                        const token = yield jwt_1.default(datos[0].Id_Usuario);
                        return res.status(200).json({
                            ok: true,
                            Usuario: datos,
                            token: token,
                        });
                    }
                    else {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'No coincide el Usuario o el Password',
                            errors: err,
                            count: count,
                        });
                    }
                });
            });
        });
    }
    // ==========================================
    // Renovar Token
    // ==========================================
    RenewToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const token = yield jwt_1.default(uid);
            return res.status(200).json({
                ok: true,
                token: token,
            });
        });
    }
}
const authController = new AuthController();
exports.default = authController;
