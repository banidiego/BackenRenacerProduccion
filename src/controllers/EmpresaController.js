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
class EmpresaController {
    // ==========================================
    // Obtener Lista de Empresas
    // ==========================================
    ListaEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM Empresa', function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Empresas: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de Empresas por Nombre de Usuario
    // ==========================================
    ListaEmpresasUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.Id_usuario;
            yield database_1.default.query('SELECT * FROM UsuariosEmpresa where Id_Usuario=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Empresas: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de Empresas por Id_usuario (Para Login)
    // ==========================================
    ListaEmpresasIdUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.Id_Usuario;
            yield database_1.default.query('SELECT Empresa.Id_Empresa,Empresa.Nombre FROM UsuariosEmpresa INNER JOIN Empresa ON UsuariosEmpresa.Id_Empresa=Empresa.Id_Empresa WHERE UsuariosEmpresa.Id_Usuario=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Empresas: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Empresa por Nombre de Empresa
    // ==========================================
    EmpresaNombreEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.params.Nombre;
            yield database_1.default.query('SELECT * FROM Empresa where Nombre=?', [nombre], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Empresa: datos,
                });
            });
        });
    }
}
const empresaController = new EmpresaController();
exports.default = empresaController;
