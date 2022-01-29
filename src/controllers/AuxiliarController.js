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
const Auxiliar_model_1 = require("../models/Auxiliar.model");
class AuxiliarController {
    // ==========================================
    // Obtener todos los Auxiliares filtrados por RUC
    // ==========================================
    ListaAuxiliaresRUC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ruc = req.params.Ruc;
            yield database_1.default.query('SELECT * FROM Auxiliar WHERE RUC = ?', [ruc], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Auxiliar: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener todos los Auxiliares filtrados por Razón Social
    // ==========================================
    ListaAuxiliaresRazonSocial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const razonSocial = req.params.RazonSocial;
            yield database_1.default.query('SELECT * FROM Auxiliar WHERE RazonSocial = ?', [razonSocial], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error en la Base de Datos cargando Auxiliares',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Auxiliar: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener todos los Auxiliares
    // ==========================================
    ListaAuxiliares(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM Auxiliar order by RazonSocial ASC', function (err, dato, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error en la Base de Datos cargando Auxiliares',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    auxiliares: dato,
                });
            });
        });
    }
    // ==========================================
    // Obtener todos los Auxiliares
    // ==========================================
    AuxiliarId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Auxiliar = req.params.id;
            yield database_1.default.query('SELECT * FROM Auxiliar where Id_Auxiliar=?', [id_Auxiliar], function (err, dato, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error en la Base de Datos cargando Auxiliares',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    auxiliar: dato,
                });
            });
        });
    }
    // ==========================================
    // Crear un nuevo Auxiliar
    // ==========================================
    GuardarAuxiliar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var auxiliar = new Auxiliar_model_1.AuxiliarModel();
            var body = req.body;
            auxiliar.Id_Auxiliar = null;
            auxiliar.RUC = body.RUC;
            auxiliar.ApellidoPaterno = body.ApellidoPaterno;
            auxiliar.ApellidoMaterno = body.ApellidoMaterno;
            auxiliar.Nombres = body.Nombres;
            auxiliar.RazonSocial = body.RazonSocial;
            auxiliar.Direccion = body.Direccion;
            auxiliar.Codigo_TipoDocumentoIdentidad = body.Codigo_TipoDocumentoIdentidad;
            yield database_1.default.query('INSERT INTO Auxiliar set ?', auxiliar, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                auxiliar.Id_Auxiliar = datos.insertId;
                res.status(201).json({
                    ok: true,
                    auxiliar: auxiliar,
                    Info: datos,
                });
            });
        });
    }
    // ==========================================
    // Actualizar Auxiliar
    // ==========================================
    ActualizarAuxiliar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var auxiliar = new Auxiliar_model_1.AuxiliarModel();
            var body = req.body;
            auxiliar.Id_Auxiliar = id;
            auxiliar.RUC = body.RUC;
            auxiliar.ApellidoPaterno = body.ApellidoPaterno;
            auxiliar.ApellidoMaterno = body.ApellidoMaterno;
            auxiliar.Nombres = body.Nombres;
            auxiliar.RazonSocial = body.RazonSocial;
            auxiliar.Direccion = body.Direccion;
            auxiliar.Codigo_TipoDocumentoIdentidad = body.Codigo_TipoDocumentoIdentidad;
            yield database_1.default.query('UPDATE Auxiliar set ? WHERE Id_Auxiliar = ?', [auxiliar, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    auxiliar: auxiliar,
                    Info: datos,
                });
            });
        });
    }
    // ============================================
    //   Borrar un Auxiliar por el id
    // ============================================
    EliminarAuxiliar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM Auxiliar WHERE Id_Auxiliar=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al borrar Auxiliar',
                        errors: err,
                    });
                }
                if (!datos) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'No existe un Auxiliar con ese id',
                        errors: { message: 'No existe un Auxiliar con ese id' },
                    });
                }
                res.status(200).json({
                    ok: true,
                    auxiliar: datos,
                });
            });
        });
    }
}
const auxiliarController = new AuxiliarController();
exports.default = auxiliarController;
