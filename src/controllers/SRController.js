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
const SR_model_1 = require("../models/SR.model");
class SRController {
    // ==========================================
    // Obtener Soliitudes Mensuales por Año, Mes y Código de Proyecto para Tabla de Movimiento Diario (Año y Origen (Codigo_Proyecto))
    // ==========================================
    ListaAnoMesIdProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            const mes = req.params.Mes;
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('SELECT * FROM SR WHERE Ano = ? and Mes = ? and Id_Proyecto = ?', [ano, mes, id_Proyecto], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando constiables de Sesión',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Solicitudes: resp,
                });
            });
        });
    }
    // ==========================================
    // Solicitudes por Rendir - Para el Inicio
    // ==========================================
    SolicitudesRendir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('SELECT * FROM SR WHERE Rendido=0 and Id_Proyecto = ?', [id_Proyecto], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando constiables de Sesión',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Solicitudes: resp,
                });
            });
        });
    }
    // ==========================================
    // Obtener Número de Solicitud (Maximo por Codigo_Proyecto y por Año)
    // ==========================================
    MaximoNumeroSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('SELECT MAX(Numero) as Maximo FROM SR WHERE Ano = ? and Id_Proyecto = ?', [ano, id_Proyecto], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Lista de Origenes',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Numero: resp,
                });
            });
        });
    }
    // ==========================================
    // Obtener SR a partir de Id_SR
    // ==========================================
    ListaIdSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_SR = req.params.Id_SR;
            yield database_1.default.query('SELECT * FROM SR WHERE Id_SR = ? ', [id_SR], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando OperaciónPrincipal',
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
    // Crear SR
    // ==========================================
    GuardarSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sr = new SR_model_1.SRModel();
            const body = req.body;
            sr.Id_SR = null;
            sr.Numero = body.Numero;
            sr.Serie = body.Serie;
            sr.Responsable = body.Responsable;
            sr.RUCResponsable = body.RUCResponsable;
            sr.FechaSolicitud = body.FechaSolicitud;
            sr.EntidadCooperante = body.EntidadCooperante;
            sr.Cheque = body.Cheque;
            sr.MonedaCheque = body.MonedaCheque;
            sr.ImporteCheque = body.ImporteCheque;
            sr.TCCheque = body.TCCheque;
            sr.Descripcion = body.Descripcion;
            sr.FechaRendicion = body.FechaRendicion;
            sr.Observaciones = body.Observaciones;
            sr.Presupuesto = body.Presupuesto;
            sr.NRI = body.NRI;
            sr.MontoRI = body.MontoRI;
            sr.NCC = body.NCC;
            sr.MontoCC = body.MontoCC;
            sr.TotalGasto = body.TotalGasto;
            sr.Id_Verificacion = body.Id_Verificacion;
            sr.Tipo = body.Tipo;
            sr.Bloqueado = body.Bloqueado;
            sr.Rendido = body.Rendido;
            sr.Rubro = body.Rubro;
            sr.Mes = body.Mes;
            sr.Ano = body.Ano;
            sr.Id_Proyecto = body.Id_Proyecto;
            yield database_1.default.query('INSERT INTO SR set ?', sr, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Operación',
                        errors: err,
                    });
                }
                sr.Id_SR = datos.insertId;
                res.status(201).json({
                    ok: true,
                    SR: sr,
                    Todo: body,
                });
            });
        });
    }
    // ==========================================
    // Actualizar SR
    // ==========================================
    ActualizarSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const sr = new SR_model_1.SRModel();
            const body = req.body;
            sr.Id_SR = id;
            sr.Numero = body.Numero;
            sr.Serie = body.Serie;
            sr.Responsable = body.Responsable;
            sr.RUCResponsable = body.RUCResponsable;
            sr.FechaSolicitud = body.FechaSolicitud;
            sr.EntidadCooperante = body.EntidadCooperante;
            sr.Cheque = body.Cheque;
            sr.MonedaCheque = body.MonedaCheque;
            sr.ImporteCheque = body.ImporteCheque;
            sr.TCCheque = body.TCCheque;
            sr.Descripcion = body.Descripcion;
            sr.FechaRendicion = body.FechaRendicion;
            sr.Observaciones = body.Observaciones;
            sr.Presupuesto = body.Presupuesto;
            sr.NRI = body.NRI;
            sr.MontoRI = body.MontoRI;
            sr.NCC = body.NCC;
            sr.MontoCC = body.MontoCC;
            sr.TotalGasto = body.TotalGasto;
            sr.Id_Verificacion = body.Id_Verificacion;
            sr.Tipo = body.Tipo;
            sr.Bloqueado = body.Bloqueado;
            sr.Rendido = body.Rendido;
            sr.Rubro = body.Rubro;
            sr.Mes = body.Mes;
            sr.Ano = body.Ano;
            sr.Id_Proyecto = body.Id_Proyecto;
            yield database_1.default.query('UPDATE SR set ? WHERE Id_SR = ?', [sr, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Actualizar Operación',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    SR: sr,
                });
            });
        });
    }
}
const sRController = new SRController();
exports.default = sRController;
