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
const TipoDocumentoIdentidad_model_1 = require("../models/TipoDocumentoIdentidad.model");
class TipoDocumentoIdentidadController {
    // ==========================================
    // Lista de TipoDocumentoIdentidad
    // ==========================================
    Lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM TipoDocumentoIdentidad ORDER BY Codigo_TipoDocumentoIdentidad ASC ', function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Tipo Documento de Identidad',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TipoDocumentoIdentidad: datos,
                });
            });
        });
    }
    // ==========================================
    // Filtrar TipoDocumento desde Codigo_TipoDocumento - Para obtener TipoRegistro
    // ==========================================
    TipoDocumentoIdentidadCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo_TipoDocumentoIdentidad = req.params.Codigo_TipoDocumentoIdentidad;
            yield database_1.default.query('SELECT * FROM TipoDocumentoIdenidad where Codigo_TipoDocumentoIdentidad = ?', [codigo_TipoDocumentoIdentidad], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error filtrando Tipo Documento',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TipoDocumentoIdentidad: datos,
                });
            });
        });
    }
    // ==========================================
    // Filtrar TipoDocumento desde Codigo_TipoDocumento - Para obtener TipoRegistro
    // ==========================================
    TipoDocumentoIdentidadId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('SELECT * FROM TipoDocumentoIdentidad where Id_TipoDocumentoIdentidad = ?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error filtrando Tipo Documento',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TipoDocumentoIdentidad: datos,
                });
            });
        });
    }
    // ==========================================
    // Crear Proyecto
    // ==========================================
    Guardar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var tipoDocumentoIdentidad = new TipoDocumentoIdentidad_model_1.TipoDocumentoIdentidadModel();
            var body = req.body;
            tipoDocumentoIdentidad.Id_TipoDocumentoIdentidad = null;
            tipoDocumentoIdentidad.Codigo_TipoDocumentoIdentidad =
                body.Codigo_TipoDocumentoIdentidad;
            tipoDocumentoIdentidad.Descripcion = body.Descripcion;
            tipoDocumentoIdentidad.Activo = body.Activo;
            yield database_1.default.query('INSERT INTO TipoDocumentoIdentidad set ?', tipoDocumentoIdentidad, (err, resp) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Medio de Pago',
                        errors: err,
                    });
                }
                tipoDocumentoIdentidad.Id_TipoDocumentoIdentidad = resp.insertId;
                res.status(201).json({
                    ok: true,
                    TipoDocumentoIdentidad: tipoDocumentoIdentidad,
                });
            });
        });
    }
    // ==========================================
    // Actualizar DetalleSR
    // ==========================================
    Actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var tipoDocumentoIdentidad = new TipoDocumentoIdentidad_model_1.TipoDocumentoIdentidadModel();
            var body = req.body;
            tipoDocumentoIdentidad.Id_TipoDocumentoIdentidad = id;
            tipoDocumentoIdentidad.Codigo_TipoDocumentoIdentidad =
                body.Codigo_TipoDocumentoIdentidad;
            tipoDocumentoIdentidad.Descripcion = body.Descripcion;
            tipoDocumentoIdentidad.Activo = body.Activo;
            yield database_1.default.query('UPDATE TipoDocumentoIdentidad set ? WHERE Id_TipoDocumentoIdentidad = ?', [tipoDocumentoIdentidad, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Actualizar Medio de Pago',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    TipoDocumentoIdentidad: datos,
                });
            });
        });
    }
    // ============================================
    //   Borrar un Operacion por el id
    // ============================================
    Eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM TipoDocumentoIdentidad WHERE Id_TipoDocumentoIdentidad=?', [id], function (err, dato, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al borrar Registro',
                        errors: err,
                    });
                }
                if (!dato) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'No existe Operacion con ese id',
                        errors: { message: 'No existe una Operacion con ese id' },
                    });
                }
                0;
                res.status(200).json({
                    ok: true,
                    TipoDocumentoIdentidad: dato,
                });
            });
        });
    }
}
const tipoDocumentoIdentidadController = new TipoDocumentoIdentidadController();
exports.default = tipoDocumentoIdentidadController;
