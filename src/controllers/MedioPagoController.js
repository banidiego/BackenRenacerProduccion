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
const MedioPago_model_1 = require("../models/MedioPago.model");
class MedioPagoController {
    // ==========================================
    // Lista de Medio de Pagos
    // ==========================================
    Lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM MedioPago ORDER BY Codigo_MedioPago ASC', function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Medio de Pago',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    MedioPagos: datos,
                });
            });
        });
    }
    // ==========================================
    // Buscar Medio de Pago por ID
    // ==========================================
    MedioPagoId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('SELECT * FROM MedioPago where Id_MedioPago=?', id, function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Medio de Pago',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    MedioPago: datos,
                });
            });
        });
    }
    // ==========================================
    // Crear Proyecto
    // ==========================================
    Guardar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var medioPago = new MedioPago_model_1.MedioPagoModel();
            var body = req.body;
            medioPago.Id_MedioPago = null;
            medioPago.Codigo_MedioPago = body.Codigo_MedioPago;
            medioPago.Descripcion = body.Descripcion;
            medioPago.Activo = body.Activo;
            yield database_1.default.query('INSERT INTO MedioPago set ?', medioPago, (err, resp) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Medio de Pago',
                        errors: err,
                    });
                }
                medioPago.Id_MedioPago = resp.insertId;
                res.status(201).json({
                    ok: true,
                    MedioPago: medioPago,
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
            var medioPago = new MedioPago_model_1.MedioPagoModel();
            var body = req.body;
            medioPago.Id_MedioPago = id;
            medioPago.Codigo_MedioPago = body.Codigo_MedioPago;
            medioPago.Descripcion = body.Descripcion;
            medioPago.Activo = body.Activo;
            yield database_1.default.query('UPDATE MedioPago set ? WHERE Id_MedioPago = ?', [medioPago, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Actualizar Medio de Pago',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    MedioPago: datos,
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
            yield database_1.default.query('DELETE FROM MedioPago WHERE Id_MedioPago=?', [id], function (err, dato, fields) {
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
                    MedioDato: dato,
                });
            });
        });
    }
}
const medioPagoController = new MedioPagoController();
exports.default = medioPagoController;
