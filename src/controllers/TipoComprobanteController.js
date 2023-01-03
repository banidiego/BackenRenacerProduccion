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
const TipoDocumento_model_1 = require("../models/TipoDocumento.model");
class TipoComprobanteController {
    // ==========================================
    // Lista Tipo de Comprobante
    // ==========================================
    Lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM TipoDocumento ', function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Tipo Documento',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TipoComprobantes: datos,
                });
            });
        });
    }
    // ==========================================
    // Filtrar TipoDocumento desde Codigo_TipoDocumento - Para obtener TipoRegistro
    // ==========================================
    TipoDocumentoCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo_TipoDocumento = req.params.Codigo_TipoDocumento;
            yield database_1.default.query('SELECT * FROM TipoDocumento where Codigo_TipoDocumento = ?', [codigo_TipoDocumento], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error filtrando Tipo Documento',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TipoDocumento: datos,
                });
            });
        });
    }
    // ==========================================
    // Filtrar TipoDocumento desde Codigo_TipoDocumento - Para obtener TipoRegistro
    // ==========================================
    TipoDocumentoId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('SELECT * FROM TipoDocumento where Id_TipoDocumento = ?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error filtrando Tipo Documento',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TipoDocumento: datos,
                });
            });
        });
    }
    // ==========================================
    // Crear Proyecto
    // ==========================================
    Guardar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var tipoDocumento = new TipoDocumento_model_1.TipoDocumentoModel();
            var body = req.body;
            tipoDocumento.Id_TipoDocumento = null;
            tipoDocumento.Codigo_TipoDocumento = body.Codigo_TipoDocumento;
            tipoDocumento.Descripcion = body.Descripcion;
            tipoDocumento.Codigo_TipoRegistro = body.Codigo_TipoRegistro;
            tipoDocumento.Activo = body.Activo;
            yield database_1.default.query('INSERT INTO TipoDocumento set ?', tipoDocumento, (err, resp) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Medio de Pago',
                        errors: err,
                    });
                }
                tipoDocumento.Id_TipoDocumento = resp.insertId;
                res.status(201).json({
                    ok: true,
                    TipoDocumento: tipoDocumento,
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
            var tipoDocumento = new TipoDocumento_model_1.TipoDocumentoModel();
            var body = req.body;
            tipoDocumento.Id_TipoDocumento = id;
            tipoDocumento.Codigo_TipoDocumento = body.Codigo_TipoDocumento;
            tipoDocumento.Descripcion = body.Descripcion;
            tipoDocumento.Codigo_TipoRegistro = body.Codigo_TipoRegistro;
            tipoDocumento.Activo = body.Activo;
            yield database_1.default.query('UPDATE TipoDocumento set ? WHERE Id_TipoDocumento = ?', [tipoDocumento, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Actualizar Medio de Pago',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    TipoDocumento: datos,
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
            yield database_1.default.query('DELETE FROM TipoDocumento WHERE Id_TipoDocumento=?', [id], function (err, dato, fields) {
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
                    TipoDocumento: dato,
                });
            });
        });
    }
}
const tipoComprobanteController = new TipoComprobanteController();
exports.default = tipoComprobanteController;
