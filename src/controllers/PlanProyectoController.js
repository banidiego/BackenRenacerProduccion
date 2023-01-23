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
const PlanProyecto_model_1 = require("../models/PlanProyecto.model");
class PlanProyectoController {
    // ==========================================
    // Obtener todos el PlanProyecto filtrados por Codigo_PlanProyecto
    // ==========================================
    ListaCodigoPlanProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ruc = req.params.Ruc;
            yield database_1.default.query('SELECT * FROM PlanProyecto WHERE RUC = ? ', [ruc], function (err, datos, fields) {
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
    // Obtener todos PlanProyecto
    // ==========================================
    ListaAnoCodigoProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('SELECT * FROM PlanProyecto WHERE Ano = ? and Id_Proyecto =  ? and Movimiento = 1', [ano, id_Proyecto], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    PlanProyecto: datos,
                    Año: ano,
                    Id_Proyecto: id_Proyecto,
                });
            });
        });
    }
    // ==========================================
    // Obtener Plan Proyecto por Id_PlanProyecto
    // ==========================================
    PlanProyectoIdPlanProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_PlanProyecto = req.params.Id_PlanProyecto;
            yield database_1.default.query('SELECT * FROM PlanProyecto WHERE Id_PlanProyecto =  ? ', [id_PlanProyecto], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    PlanProyecto: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener TODOS PlanProyecto por Año
    // ==========================================
    ListaTodosAnoIdProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('SELECT * FROM PlanProyecto WHERE Ano = ? and Id_Proyecto =  ? order by Codigo_PlanProyecto asc', [ano, id_Proyecto], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    PlanProyecto: datos,
                    Año: ano,
                    Id_Proyecto: id_Proyecto,
                });
            });
        });
    }
    // ==========================================
    // Crear un nuevo Plan de Proyecto
    // ==========================================
    GuardarPlanProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var planproyecto = new PlanProyecto_model_1.PlanProyectoModel();
            var body = req.body;
            planproyecto.Id_PlanProyecto = null;
            planproyecto.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
            planproyecto.Nombre_PlanProyecto = body.Nombre_PlanProyecto;
            planproyecto.EneroSolesP = body.EneroSolesP;
            planproyecto.FebreroSolesP = body.FebreroSolesP;
            planproyecto.MarzoSolesP = body.MarzoSolesP;
            planproyecto.AbrilSolesP = body.AbrilSolesP;
            planproyecto.MayoSolesP = body.MayoSolesP;
            planproyecto.JunioSolesP = body.JunioSolesP;
            planproyecto.JulioSolesP = body.JulioSolesP;
            planproyecto.AgostoSolesP = body.AgostoSolesP;
            planproyecto.SeptiembreSolesP = body.SeptiembreSolesP;
            planproyecto.OctubreSolesP = body.OctubreSolesP;
            planproyecto.NoviembreSolesP = body.NoviembreSolesP;
            planproyecto.DiciembreSolesP = body.DiciembreSolesP;
            planproyecto.EneroDolaresP = body.EneroDolaresP;
            planproyecto.FebreroDolaresP = body.FebreroDolaresP;
            planproyecto.MarzoDolaresP = body.MarzoDolaresP;
            planproyecto.AbrilDolaresP = body.AbrilDolaresP;
            planproyecto.MayoDolaresP = body.MayoDolaresP;
            planproyecto.JunioDolaresP = body.JunioDolaresP;
            planproyecto.JulioDolaresP = body.JulioDolaresP;
            planproyecto.AgostoDolaresP = body.AgostoDolaresP;
            planproyecto.SeptiembreDolaresP = body.SeptiembreDolaresP;
            planproyecto.OctubreDolaresP = body.OctubreDolaresP;
            planproyecto.NoviembreDolaresP = body.NoviembreDolaresP;
            planproyecto.DiciembreDolaresP = body.DiciembreDolaresP;
            planproyecto.EneroSolesG = body.EneroSolesG;
            planproyecto.FebreroSolesG = body.FebreroSolesG;
            planproyecto.MarzoSolesG = body.MarzoSolesG;
            planproyecto.AbrilSolesG = body.AbrilSolesG;
            planproyecto.MayoSolesG = body.MayoSolesG;
            planproyecto.JunioSolesG = body.JunioSolesG;
            planproyecto.JulioSolesG = body.JulioSolesG;
            planproyecto.AgostoSolesG = body.AgostoSolesG;
            planproyecto.SeptiembreSolesG = body.SeptiembreSolesG;
            planproyecto.OctubreSolesG = body.OctubreSolesG;
            planproyecto.NoviembreSolesG = body.NoviembreSolesG;
            planproyecto.DiciembreSolesG = body.DiciembreSolesG;
            planproyecto.EneroDolaresG = body.EneroDolaresG;
            planproyecto.FebreroDolaresG = body.FebreroDolaresG;
            planproyecto.MarzoDolaresG = body.MarzoDolaresG;
            planproyecto.AbrilDolaresG = body.AbrilDolaresG;
            planproyecto.MayoDolaresG = body.MayoDolaresG;
            planproyecto.JunioDolaresG = body.JunioDolaresG;
            planproyecto.JulioDolaresG = body.JulioDolaresG;
            planproyecto.AgostoDolaresG = body.AgostoDolaresG;
            planproyecto.SeptiembreDolaresG = body.SeptiembreDolaresG;
            planproyecto.OctubreDolaresG = body.OctubreDolaresG;
            planproyecto.NoviembreDolaresG = body.NoviembreDolaresG;
            planproyecto.DiciembreDolaresG = body.DiciembreDolaresG;
            planproyecto.Id_Proyecto = body.Id_Proyecto;
            planproyecto.Ano = body.Ano;
            planproyecto.Movimiento = body.Movimiento;
            yield database_1.default.query('INSERT INTO PlanProyecto set ?', planproyecto, (err, PlanProyectoGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                planproyecto.Id_PlanProyecto = PlanProyectoGuardado.insertId;
                res.status(201).json({
                    ok: true,
                    PlanProyecto: planproyecto,
                });
            });
        });
    }
    // ==========================================
    // Crear un nuevo Plan de Proyecto
    // ==========================================
    ActualizarPlanProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var planproyecto = new PlanProyecto_model_1.PlanProyectoModel();
            var body = req.body;
            planproyecto.Id_PlanProyecto = id;
            planproyecto.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
            planproyecto.Nombre_PlanProyecto = body.Nombre_PlanProyecto;
            planproyecto.EneroSolesP = body.EneroSolesP;
            planproyecto.FebreroSolesP = body.FebreroSolesP;
            planproyecto.MarzoSolesP = body.MarzoSolesP;
            planproyecto.AbrilSolesP = body.AbrilSolesP;
            planproyecto.MayoSolesP = body.MayoSolesP;
            planproyecto.JunioSolesP = body.JunioSolesP;
            planproyecto.JulioSolesP = body.JulioSolesP;
            planproyecto.AgostoSolesP = body.AgostoSolesP;
            planproyecto.SeptiembreSolesP = body.SeptiembreSolesP;
            planproyecto.OctubreSolesP = body.OctubreSolesP;
            planproyecto.NoviembreSolesP = body.NoviembreSolesP;
            planproyecto.DiciembreSolesP = body.DiciembreSolesP;
            planproyecto.EneroDolaresP = body.EneroDolaresP;
            planproyecto.FebreroDolaresP = body.FebreroDolaresP;
            planproyecto.MarzoDolaresP = body.MarzoDolaresP;
            planproyecto.AbrilDolaresP = body.AbrilDolaresP;
            planproyecto.MayoDolaresP = body.MayoDolaresP;
            planproyecto.JunioDolaresP = body.JunioDolaresP;
            planproyecto.JulioDolaresP = body.JulioDolaresP;
            planproyecto.AgostoDolaresP = body.AgostoDolaresP;
            planproyecto.SeptiembreDolaresP = body.SeptiembreDolaresP;
            planproyecto.OctubreDolaresP = body.OctubreDolaresP;
            planproyecto.NoviembreDolaresP = body.NoviembreDolaresP;
            planproyecto.DiciembreDolaresP = body.DiciembreDolaresP;
            planproyecto.EneroSolesG = body.EneroSolesG;
            planproyecto.FebreroSolesG = body.FebreroSolesG;
            planproyecto.MarzoSolesG = body.MarzoSolesG;
            planproyecto.AbrilSolesG = body.AbrilSolesG;
            planproyecto.MayoSolesG = body.MayoSolesG;
            planproyecto.JunioSolesG = body.JunioSolesG;
            planproyecto.JulioSolesG = body.JulioSolesG;
            planproyecto.AgostoSolesG = body.AgostoSolesG;
            planproyecto.SeptiembreSolesG = body.SeptiembreSolesG;
            planproyecto.OctubreSolesG = body.OctubreSolesG;
            planproyecto.NoviembreSolesG = body.NoviembreSolesG;
            planproyecto.DiciembreSolesG = body.DiciembreSolesG;
            planproyecto.EneroDolaresG = body.EneroDolaresG;
            planproyecto.FebreroDolaresG = body.FebreroDolaresG;
            planproyecto.MarzoDolaresG = body.MarzoDolaresG;
            planproyecto.AbrilDolaresG = body.AbrilDolaresG;
            planproyecto.MayoDolaresG = body.MayoDolaresG;
            planproyecto.JunioDolaresG = body.JunioDolaresG;
            planproyecto.JulioDolaresG = body.JulioDolaresG;
            planproyecto.AgostoDolaresG = body.AgostoDolaresG;
            planproyecto.SeptiembreDolaresG = body.SeptiembreDolaresG;
            planproyecto.OctubreDolaresG = body.OctubreDolaresG;
            planproyecto.NoviembreDolaresG = body.NoviembreDolaresG;
            planproyecto.DiciembreDolaresG = body.DiciembreDolaresG;
            planproyecto.Id_Proyecto = body.Id_Proyecto;
            planproyecto.Ano = body.Ano;
            planproyecto.Movimiento = body.Movimiento;
            yield database_1.default.query('UPDATE  PlanProyecto set ? WHERE Id_PlanProyecto=?', [planproyecto, id], (err, PlanProyectoGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    PlanProyecto: planproyecto,
                });
            });
        });
    }
    // ==========================================
    // ActualizarValoresPlanProyecto
    // ==========================================
    ActualizarValoresPlanProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Proyecto = req.params.Id_Proyecto;
            const ano = req.params.Ano;
            yield database_1.default.query('CALL `ActualizarValoresPlanProyecto`(?,?)', [id_Proyecto, ano], function (err, resp, fields) {
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
    // ============================================
    //   Borrar un Planproyecto por el id
    // ============================================
    EliminarPlanProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM PlanProyecto WHERE Id_PlanProyecto=?', [id], function (err, dato, fields) {
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
                        mensaje: 'No existe el Código de Proyecto con ese id',
                        errors: { message: 'No existe el Código de Proyecto con ese id' },
                    });
                }
                0;
                res.status(200).json({
                    ok: true,
                    PlanProyecto: dato,
                });
            });
        });
    }
    // ==========================================
    // GastoBancarioMensual
    // ==========================================
    GastoBancarioMensual(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = req.params.Ano;
            const id_Proyecto = req.params.Id_Proyecto;
            const mes = req.params.Mes;
            const codigo_Planproyecto = req.params.Codigo_PlanProyecto;
            yield database_1.default.query('CALL `GastoBancarioMensual`(?,?,?,?)', [ano, id_Proyecto, mes, codigo_Planproyecto], function (err, resp, fields) {
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
    // ==========================================
    // GastoBancarioMensual
    // ==========================================
    GastoAcumuladoMensual(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = req.params.Ano;
            const id_Proyecto = req.params.Id_Proyecto;
            const mes = req.params.Mes;
            const codigo_Planproyecto = req.params.Codigo_PlanProyecto;
            yield database_1.default.query('CALL `GastoAcumuladoMensual`(?,?,?,?)', [ano, id_Proyecto, mes, codigo_Planproyecto], function (err, resp, fields) {
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
const planProyectoController = new PlanProyectoController();
exports.default = planProyectoController;
