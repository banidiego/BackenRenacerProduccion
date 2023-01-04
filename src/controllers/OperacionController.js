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
const Operacion_model_1 = require("../models/Operacion.model");
class OperacionController {
    // ==========================================
    // Obtener Lista de Operaciones por Id_OperacionPrincipal
    // ==========================================
    ListaOperacionPrincipal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_OperacionPrincipal = req.params.Id_OperacionPrincipal;
            yield database_1.default.query('SELECT * FROM Operacion WHERE Id_OperacionPrincipal = ? ', [id_OperacionPrincipal], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando las Operaciones',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    operaciones: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de todas las Operaciones (Historia))
    // ==========================================
    ListaOperacionTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM Operacion', function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando las Operaciones',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    operaciones: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de Operaciones por Id_DetalleSR TipoSR 2 - Para Tabla de Registro de Gasto
    // ==========================================
    ListaOperacionIdDetalleSRRegistroGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_DetalleSR = req.params.Id_DetalleSR;
            yield database_1.default.query('SELECT * FROM Operacion WHERE Id_DetalleSR = ?  and TipoSR=2', [id_DetalleSR], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando las Operaciones',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    operaciones: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de Operaciones por Id_SR
    // ==========================================
    ListaId_SR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_SR = req.params.Id_SR;
            yield database_1.default.query('SELECT * FROM Operacion WHERE Id_SR = ? and TipoSR = 1 ', [id_SR], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando las Operaciones',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    SR: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de Operaciones por Id_SR
    // ==========================================
    OperacionTipoSR3(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_SR = req.params.Id_SR;
            yield database_1.default.query('SELECT * FROM Operacion WHERE Id_SR = ? and TipoSR = 3 ', [id_SR], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando las Operaciones',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    SR: datos,
                });
            });
        });
    }
    // ==========================================
    // Crear Operación
    // ==========================================
    GuardarOperacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var operacion = new Operacion_model_1.OperacionModel();
            var body = req.body;
            operacion.Id_Operacion = null;
            operacion.Id_OperacionPrincipal = body.Id_OperacionPrincipal;
            operacion.TipoOrigen = body.TipoOrigen;
            operacion.CodigoOperacion = body.CodigoOperacion;
            operacion.DescripcionOperacion = body.DescripcionOperacion;
            operacion.FechaOperacion = body.FechaOperacion;
            operacion.ResponsableGiro = body.ResponsableGiro;
            operacion.RUCResponsableGiro = body.RUCResponsableGiro;
            operacion.Solicitud = body.Solicitud;
            operacion.TipoSR = body.TipoSR;
            operacion.Id_SR = body.Id_SR;
            operacion.Id_DetalleSR = body.Id_DetalleSR;
            operacion.DescripcionDetalle = body.DescripcionDetalle;
            operacion.TC = body.TC;
            operacion.Codigo_MedioPago = body.Codigo_MedioPago;
            operacion.ChequeSoles = body.ChequeSoles;
            operacion.ChequeDolares = body.ChequeDolares;
            operacion.Codigo_TipoDocumento = body.Codigo_TipoDocumento;
            operacion.Codigo_TipoRegistro = body.Codigo_TipoRegistro;
            operacion.SerieComprobante = body.SerieComprobante;
            operacion.NumeroComprobante = body.NumeroComprobante;
            operacion.FechaComprobante = body.FechaComprobante;
            operacion.RUCAuxiliar = body.RUCAuxiliar;
            operacion.RazonSocial = body.RazonSocial;
            operacion.Codigo_TipoDocumentoIdentidad =
                body.Codigo_TipoDocumentoIdentidad;
            operacion.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
            operacion.Codigo_PlanCuenta = body.Codigo_PlanCuenta;
            operacion.Nombre_PlanCuenta = body.Nombre_PlanCuenta;
            operacion.MontoSoles = body.MontoSoles;
            operacion.MontoDolares = body.MontoDolares;
            operacion.DebeSoles = body.DebeSoles;
            operacion.HaberSoles = body.HaberSoles;
            operacion.DebeDolares = body.DebeDolares;
            operacion.HaberDolares = body.HaberDolares;
            operacion.C1 = body.C1;
            operacion.C2 = body.C2;
            operacion.C3 = body.C3;
            operacion.C4 = body.C4;
            operacion.C5 = body.C5;
            operacion.C6 = body.C6;
            operacion.C7 = body.C7;
            operacion.C8 = body.C8;
            operacion.C9 = body.C9;
            operacion.C10 = body.C10;
            operacion.V1 = body.V1;
            operacion.V2 = body.V2;
            operacion.V3 = body.V3;
            operacion.V4 = body.V4;
            operacion.V5 = body.V5;
            operacion.V6 = body.V6;
            operacion.V7 = body.V7;
            operacion.Mes = body.Mes;
            operacion.Ano = body.Ano;
            operacion.Id_Proyecto = body.Id_Proyecto;
            operacion.Anulado = body.Anulado;
            operacion.Saldo = body.Saldo;
            operacion.CuentaPendiente = body.CuentaPendiente;
            operacion.TipoSaldo = body.TipoSaldo;
            yield database_1.default.query('INSERT INTO Operacion set ?', operacion, (err, OperacionGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Operación',
                        errors: err,
                    });
                }
                operacion.Id_Operacion = OperacionGuardado.insertId;
                res.status(201).json({
                    ok: true,
                    Operacion: operacion,
                });
            });
        });
    }
    // ==========================================
    // Actualizar Operación
    // ==========================================
    ActualizarOperacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var operacion = new Operacion_model_1.OperacionModel();
            var body = req.body;
            operacion.Id_Operacion = id;
            operacion.Id_OperacionPrincipal = body.Id_OperacionPrincipal;
            operacion.TipoOrigen = body.TipoOrigen;
            operacion.CodigoOperacion = body.CodigoOperacion;
            operacion.DescripcionOperacion = body.DescripcionOperacion;
            operacion.FechaOperacion = body.FechaOperacion;
            operacion.ResponsableGiro = body.ResponsableGiro;
            operacion.RUCResponsableGiro = body.RUCResponsableGiro;
            operacion.Solicitud = body.Solicitud;
            operacion.TipoSR = body.TipoSR;
            operacion.Id_SR = body.Id_SR;
            operacion.Id_DetalleSR = body.Id_DetalleSR;
            operacion.DescripcionDetalle = body.DescripcionDetalle;
            operacion.TC = body.TC;
            operacion.Codigo_MedioPago = body.Codigo_MedioPago;
            operacion.ChequeSoles = body.ChequeSoles;
            operacion.ChequeDolares = body.ChequeDolares;
            operacion.Codigo_TipoDocumento = body.Codigo_TipoDocumento;
            operacion.Codigo_TipoRegistro = body.Codigo_TipoRegistro;
            operacion.SerieComprobante = body.SerieComprobante;
            operacion.NumeroComprobante = body.NumeroComprobante;
            operacion.FechaComprobante = body.FechaComprobante;
            operacion.RUCAuxiliar = body.RUCAuxiliar;
            operacion.RazonSocial = body.RazonSocial;
            operacion.Codigo_TipoDocumentoIdentidad =
                body.Codigo_TipoDocumentoIdentidad;
            operacion.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
            operacion.Codigo_PlanCuenta = body.Codigo_PlanCuenta;
            operacion.Nombre_PlanCuenta = body.Nombre_PlanCuenta;
            operacion.MontoSoles = body.MontoSoles;
            operacion.MontoDolares = body.MontoDolares;
            operacion.DebeSoles = body.DebeSoles;
            operacion.HaberSoles = body.HaberSoles;
            operacion.DebeDolares = body.DebeDolares;
            operacion.HaberDolares = body.HaberDolares;
            operacion.C1 = body.C1;
            operacion.C2 = body.C2;
            operacion.C3 = body.C3;
            operacion.C4 = body.C4;
            operacion.C5 = body.C5;
            operacion.C6 = body.C6;
            operacion.C7 = body.C7;
            operacion.C8 = body.C8;
            operacion.C9 = body.C9;
            operacion.C10 = body.C10;
            operacion.V1 = body.V1;
            operacion.V2 = body.V2;
            operacion.V3 = body.V3;
            operacion.V4 = body.V4;
            operacion.V5 = body.V5;
            operacion.V6 = body.V6;
            operacion.V7 = body.V7;
            operacion.Mes = body.Mes;
            operacion.Ano = body.Ano;
            operacion.Id_Proyecto = body.Id_Proyecto;
            operacion.Anulado = body.Anulado;
            operacion.Saldo = body.Saldo;
            operacion.CuentaPendiente = body.CuentaPendiente;
            operacion.TipoSaldo = body.TipoSaldo;
            yield database_1.default.query('UPDATE Operacion set ? WHERE Id_Operacion = ?', [operacion, id], (err, OperacionGuardado) => {
                if (err) {
                    return res.status(400).json({
                        body: operacion,
                        ok: false,
                        mensaje: 'Error al Actualizar Operación',
                        errors: err,
                    });
                }
                res.status(201).json({
                    body: operacion,
                    ok: true,
                    Operacion: operacion,
                });
            });
        });
    }
    // ============================================
    //   Borrar un Operacion por el id
    // ============================================
    EliminarOperacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM Operacion WHERE Id_Operacion=?', [id], function (err, dato, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al borrar Operacion',
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
                    Operacion: dato,
                });
            });
        });
    }
}
const operacionController = new OperacionController();
exports.default = operacionController;
