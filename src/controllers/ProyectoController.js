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
const Proyecto_model_1 = require("../models/Proyecto.model");
class ProyectoController {
    // ==========================================
    // Obtener de Proyecto Actual (para SR)
    // ==========================================
    ProyectoIdProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('SELECT * FROM Proyecto WHERE Id_Proyecto = ?', [id_Proyecto], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Variables de Sesión',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    id_Proyecto,
                    ok: true,
                    Proyecto: resp,
                });
            });
        });
    }
    // ==========================================
    // Obtener de Proyecto Actual (para SR)
    // ==========================================
    ListaProyectos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM Proyecto', function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Variables de Sesión',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Proyecto: resp,
                });
            });
        });
    }
    // ==========================================
    // Crear Proyecto
    // ==========================================
    GuardarProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var proyecto = new Proyecto_model_1.ProyectoModel();
            var body = req.body;
            proyecto.Id_Proyecto = null;
            proyecto.Codigo_Proyecto = body.Codigo_Proyecto;
            proyecto.Nombre_Proyecto = body.Nombre_Proyecto;
            proyecto.Cooperante = body.Cooperante;
            proyecto.Estado = body.Estado;
            proyecto.Origen = body.Origen;
            proyecto.Serie = body.Serie;
            yield database_1.default.query('INSERT INTO Proyecto set ?', proyecto, (err, resp) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Operación',
                        errors: err,
                    });
                }
                proyecto.Id_Proyecto = resp.insertId;
                res.status(201).json({
                    ok: true,
                    proyecto: proyecto,
                });
            });
        });
    }
    // ==========================================
    // Actualizar DetalleSR
    // ==========================================
    ActualizarProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var proyecto = new Proyecto_model_1.ProyectoModel();
            var body = req.body;
            proyecto.Id_Proyecto = id;
            proyecto.Codigo_Proyecto = body.Codigo_Proyecto;
            proyecto.Nombre_Proyecto = body.Nombre_Proyecto;
            proyecto.Cooperante = body.Cooperante;
            proyecto.Estado = body.Estado;
            proyecto.Origen = body.Origen;
            proyecto.Serie = body.Serie;
            yield database_1.default.query('UPDATE Proyecto set ? WHERE Id_Proyecto = ?', [proyecto, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Actualizar DetalleSR',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    proyecto: datos,
                });
            });
        });
    }
}
const proyectoController = new ProyectoController();
exports.default = proyectoController;
