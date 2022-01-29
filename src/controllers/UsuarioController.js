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
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const database_1 = __importDefault(require("../database"));
const Usuario_model_1 = require("../models/Usuario.model");
class UsuarioController {
    // // ==========================================
    // // Obtener Información de Variables de Sesión - Si no Exite lo crea
    // // ==========================================
    // public async VariableSesionId(req: Request, res: Response) {
    //   const Id = req.params.id;
    //   await pool.query(
    //     'SELECT * FROM VariableSesion WHERE Id_Usuario = ?',
    //     [Id],
    //     function (err, datos, fields) {
    //       if (err) {
    //         return res.status(500).json({
    //           ok: false,
    //           mensaje: 'Error cargando Variables de Sesión',
    //           errors: err,
    //         });
    //       }
    //       return res.status(200).json({
    //         ok: true,
    //         VariablesSesion: datos[0],
    //       });
    //     }
    //   );
    // }
    // ==========================================
    // Crear usuario
    // ==========================================
    GuardarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var usuario = new Usuario_model_1.UsuarioModel();
            var body = req.body;
            usuario.Id_Usuario = null;
            usuario.Usuario = body.Usuario;
            usuario.Password = body.Password;
            usuario.Nombres = body.Nombres;
            usuario.Email = body.Email;
            usuario.Imagen = req.file.path;
            yield database_1.default.query('INSERT INTO Usuario set ?', usuario, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Usuario',
                        errors: err,
                    });
                }
                usuario.Id_Usuario = datos.insertId;
                res.status(201).json({
                    ok: true,
                    Usuario: usuario,
                });
            });
            // console.log('Guardando Imagenes');
            // console.log(req.file.path);
            // return res.json({
            //   mensaje: 'Foto Guardada!',
            // });
        });
    }
    // ==========================================
    // Actualizar Usuario
    // ==========================================
    ActualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var usuario = new Usuario_model_1.UsuarioModel();
            var body = req.body;
            usuario.Id_Usuario = id;
            usuario.Usuario = body.Usuario;
            usuario.Password = body.Password;
            usuario.Nombres = body.Nombres;
            usuario.Email = body.Email;
            usuario.Imagen = req.file.path;
            yield database_1.default.query('Select Imagen from Usuario where Id_Usuario=?', [id], (err, datos) => {
                if (err) {
                }
                else {
                    if (path_1.default.resolve(datos[0].Imagen)) {
                        fs_extra_1.default.unlink(path_1.default.resolve(datos[0].Imagen));
                    }
                }
            });
            yield database_1.default.query('UPDATE Usuario set ? WHERE Id_Usuario = ?', [usuario, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar Usuario',
                        errors: err,
                    });
                }
                res.status(200).json({
                    ok: true,
                    Usuario: usuario,
                });
            });
        });
    }
    // ============================================
    //   Eliminar Usuario
    // ============================================
    EliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM Usuario WHERE Id_Usuario=?', [id], function (err, dato, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al eliminar Usuario',
                        errors: err,
                    });
                }
                if (!dato) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'No existe un Usuario con ese id',
                        errors: { message: 'No existe un Usuario con ese id' },
                    });
                }
                if (dato) {
                    fs_extra_1.default.unlink(path_1.default.resolve(dato.Imagen));
                }
                res.status(200).json({
                    ok: true,
                    Usuario: dato,
                });
            });
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
