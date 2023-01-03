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
const PlanContable_model_1 = require("../models/PlanContable.model");
class PlanContableController {
    // ==========================================
    // Obtener todos el PlanContable filtrados por Codigo_PlanCuenta y Año
    // ==========================================
    ListaCodigoPlanCuentaAno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo_PlanCuenta = req.params.Codigo_PlanCuenta;
            const ano = parseInt(req.params.Ano);
            yield database_1.default.query('SELECT * FROM PlanContable WHERE Codigo_PlanCuenta = ? and Ano = ?', [codigo_PlanCuenta, ano], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando PlanContable',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    PlanContable: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener todos el PlanContable filtrados por Codigo_PlanCuenta y Año
    // ==========================================
    ListaIdPlanCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_PlanCuenta = req.params.Id_PlanContable;
            yield database_1.default.query('SELECT * FROM PlanContable WHERE Id_PlanContable = ? ', [id_PlanCuenta], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando PlanContable',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    PlanContable: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener todos PlanProyecto
    // ==========================================
    ListaAno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            yield database_1.default.query('SELECT * FROM PlanContable WHERE Ano = ? and Movimiento = 1 ', [ano], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    PlanContable: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener todos PlanProyecto incluyendo no Movimiento
    // ==========================================
    ListaAnoTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            yield database_1.default.query('SELECT * FROM PlanContable WHERE Ano = ? ORDER BY Codigo_PlanCuenta ASC', [ano], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando PlanContable',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    PlanContable: datos,
                });
            });
        });
    }
    // ==========================================
    // Crear un nuevo Plan Contable
    // ==========================================
    GuardarPlanContable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var planContable = new PlanContable_model_1.PlanContableModel();
            var body = req.body;
            planContable.Id_PlanContable = null;
            planContable.Codigo_PlanCuenta = body.Codigo_PlanCuenta;
            planContable.Nombre_PlanCuenta = body.Nombre_PlanCuenta;
            planContable.DebeApertura = body.DebeApertura;
            planContable.HaberApertura = body.HaberApertura;
            planContable.DebeMovimientoAnual = body.DebeMovimientoAnual;
            planContable.HaberMovimientoAnual = body.HaberMovimientoAnual;
            planContable.DeudorSaldos = body.DeudorSaldos;
            planContable.AcreedorSaldos = body.AcreedorSaldos;
            planContable.DeudorSaldosAjustados = body.DeudorSaldosAjustados;
            planContable.AcreedorSaldosAjustados = body.AcreedorSaldosAjustados;
            planContable.ActivoBG = body.ActivoBG;
            planContable.PasivoBG = body.PasivoBG;
            planContable.PerdidaFuncion = body.PerdidaFuncion;
            planContable.GananciaFuncion = body.GananciaFuncion;
            planContable.PerdidaNaturaleza = body.PerdidaNaturaleza;
            planContable.GananciaNaturaleza = body.GananciaNaturaleza;
            planContable.Movimiento = body.Movimiento;
            planContable.CuentaActiva = body.CuentaActiva;
            planContable.Id_Proyecto = body.Id_Proyecto;
            planContable.Ano = body.Ano;
            yield database_1.default.query('INSERT INTO PlanContable set ?', planContable, (err, resp) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                planContable.Id_PlanContable = resp.insertId;
                res.status(201).json({
                    ok: true,
                    PlanContable: planContable,
                });
            });
        });
    }
    // ==========================================
    // Actualizar Plan Contable
    // ==========================================
    ActualizarPlanContable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const planContable = new PlanContable_model_1.PlanContableModel();
            const body = req.body;
            planContable.Id_PlanContable = id;
            planContable.Codigo_PlanCuenta = body.Codigo_PlanCuenta;
            planContable.Nombre_PlanCuenta = body.Nombre_PlanCuenta;
            planContable.DebeApertura = body.DebeApertura;
            planContable.HaberApertura = body.HaberApertura;
            planContable.DebeMovimientoAnual = body.DebeMovimientoAnual;
            planContable.HaberMovimientoAnual = body.HaberMovimientoAnual;
            planContable.DeudorSaldos = body.DeudorSaldos;
            planContable.AcreedorSaldos = body.AcreedorSaldos;
            planContable.DeudorSaldosAjustados = body.DeudorSaldosAjustados;
            planContable.AcreedorSaldosAjustados = body.AcreedorSaldosAjustados;
            planContable.ActivoBG = body.ActivoBG;
            planContable.PasivoBG = body.PasivoBG;
            planContable.PerdidaFuncion = body.PerdidaFuncion;
            planContable.GananciaFuncion = body.GananciaFuncion;
            planContable.PerdidaNaturaleza = body.PerdidaNaturaleza;
            planContable.GananciaNaturaleza = body.GananciaNaturaleza;
            planContable.Movimiento = body.Movimiento;
            planContable.CuentaActiva = body.CuentaActiva;
            planContable.Id_Proyecto = body.Id_Proyecto;
            planContable.Ano = body.Ano;
            yield database_1.default.query('UPDATE PlanContable set ? WHERE Id_PlanContable = ?', [planContable, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Actualizar Operación',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    PlanContable: planContable,
                });
            });
        });
    }
    // ============================================
    //   Borrar Plan Contable
    // ============================================
    EliminarPlanContable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM PlanContable WHERE Id_PlanContable=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al borrar PlanContable',
                        errors: err,
                    });
                }
                if (!datos) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'No existe un PlanContable con ese id',
                        errors: { message: 'No existe un PlanContable con ese id' },
                    });
                }
                res.status(200).json({
                    ok: true,
                    PlanContable: datos,
                });
            });
        });
    }
    // ==========================================
    // ActualizarValoresPlanProyecto
    // ==========================================
    ActualizarValoresPlanContable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = req.params.Ano;
            yield database_1.default.query('CALL `ActualizarValoresPlanContable`(?)', [ano], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Procedimiento Almacenado',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Respuesta: resp,
                });
            });
        });
    }
}
const planContableController = new PlanContableController();
exports.default = planContableController;
