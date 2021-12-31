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
const CLIENT_ID = '278464843479-iunvf1v38nm237kv1oc18troinb0nvte.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        return {
            nombre: payload.name,
            email: payload.email,
            img: payload.picture,
            google: true,
            payload,
        };
    });
}
class LoginController {
    AutentificacionGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var token = req.body.token || 'XXX';
            var googleUser = yield verify(token).catch((e) => {
                return res.status(403).json({
                    ok: false,
                    mensaje: 'Token no válido',
                });
            });
            // var client = new auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET, '');
            yield database_1.default.query('SELECT * FROM Usuario WHERE email = ?', [googleUser.email], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: true,
                        mensaje: 'Error al buscar usuario - login',
                        errors: err,
                    });
                }
                datos[0].nombre = googleUser.nombre;
                datos[0].img = googleUser.img;
                return res.status(200).json({
                    ok: true,
                    usuario: datos,
                    token,
                    id: datos[0].Id_Usuario,
                });
            });
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
