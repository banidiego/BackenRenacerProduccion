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
const DetalleSR_model_1 = require("../models/DetalleSR.model");
class DetalleSRController {
    // ==========================================
    // Obtener Lista de DetalleSR por Id_SR
    // ==========================================
    ListaDetalleSRIdSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_SR = req.params.Id_SR;
            yield database_1.default.query('SELECT * FROM DetalleSR WHERE Id_SR = ?', [id_SR], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los DetalleSR',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    DetalleSR: datos,
                });
            });
        });
    }
    // ==========================================
    // Suma de Total de Gasto por SR
    // ==========================================
    SumaTotalGastoIdSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_SR = req.params.Id_SR;
            yield database_1.default.query('SELECT sum(Gasto)as TotalGasto, sum(Presupuesto) as TotalPresupuesto FROM DetalleSR WHERE Id_SR = ? ', [id_SR], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Datos de DetalleSR',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Totales: resp,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de DetalleSR por Id_DetalleSR
    // ==========================================
    ListaDetalleSRIdDetalleSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_DetalleSR = req.params.Id_DetalleSR;
            yield database_1.default.query('SELECT * FROM DetalleSR WHERE Id_DetalleSR = ?', [id_DetalleSR], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los DetalleSR',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    DetalleSR: datos,
                });
            });
        });
    }
    // ==========================================
    // Crear DetalleSR
    // ==========================================
    GuardarDetalleSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var detalleSR = new DetalleSR_model_1.DetalleSRModel();
            var body = req.body;
            detalleSR.Id_DetalleSR = null;
            detalleSR.Id_SR = body.Id_SR;
            detalleSR.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
            detalleSR.Presupuesto = body.Presupuesto;
            detalleSR.Gasto = body.Gasto;
            detalleSR.Actividad = body.Actividad;
            yield database_1.default.query('INSERT INTO DetalleSR set ?', detalleSR, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear DetalleSR',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    DetalleSR: datos,
                });
            });
        });
    }
    // ==========================================
    // Actualizar DetalleSR
    // ==========================================
    ActualizarDetalleSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var detalleSR = new DetalleSR_model_1.DetalleSRModel();
            var body = req.body;
            detalleSR.Id_DetalleSR = id;
            detalleSR.Id_SR = body.Id_SR;
            detalleSR.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
            detalleSR.Presupuesto = body.Presupuesto;
            detalleSR.Gasto = body.Gasto;
            detalleSR.Actividad = body.Actividad;
            yield database_1.default.query('UPDATE DetalleSR set ? WHERE Id_DetalleSR = ?', [detalleSR, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Actualizar DetalleSR',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    DetalleSR: datos,
                });
            });
        });
    }
    // ============================================
    //   Eliminar DetalleSR por Id_DetalleSR
    // ============================================
    EliminarDetalleSR(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM DetalleSR WHERE Id_DetalleSR=?', [id], function (err, dato, fields) {
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
                    DetalleSR: dato,
                });
            });
        });
    }
}
const detalleSRController = new DetalleSRController();
exports.default = detalleSRController;
