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
const OtroGasto_model_1 = require("../models/OtroGasto.model");
class OtroGastoController {
    // ==========================================
    // Obtener Lista de OtroGasto por Id_Empresa
    // ==========================================
    ListaOtroGastoId_Empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('SELECT * FROM OtroGasto where Id_Empresa=?', [id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    OtroGasto: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Suma Otro Gasto
    // ==========================================
    SumaOtroGastoId_Empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('SELECT sum(Total) as Total FROM OtroGasto where Id_Empresa=?', [id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Suma: datos,
                });
            });
        });
    }
    // // ==========================================
    // // Obtener todos los Auxiliares filtrados por Razón Social
    // // ==========================================
    // public async ListaAuxiliaresRazonSocial(req: Request, res: Response) {
    //   const razonSocial = req.params.RazonSocial;
    //   await pool.query(
    //     'SELECT * FROM Auxiliar WHERE RazonSocial = ?',
    //     [razonSocial],
    //     function (err, datos, fields) {
    //       if (err) {
    //         return res.status(500).json({
    //           ok: false,
    //           mensaje: 'Error en la Base de Datos cargando Auxiliares',
    //           errors: err,
    //         });
    //       }
    //       return res.status(200).json({
    //         ok: true,
    //         Auxiliar: datos,
    //       });
    //     }
    //   );
    // }
    // // ==========================================
    // // Obtener todos los Auxiliares
    // // ==========================================
    // public async ListaAuxiliares(req: Request, res: Response) {
    //   await pool.query(
    //     'SELECT * FROM Auxiliar',
    //     function (err, dato, fields) {
    //       if (err) {
    //         return res.status(500).json({
    //           ok: false,
    //           mensaje: 'Error en la Base de Datos cargando Auxiliares',
    //           errors: err,
    //         });
    //       }
    //       return res.status(200).json({
    //         ok: true,
    //         auxiliares: dato,
    //       });
    //     }
    //   );
    // }
    // ==========================================
    // Crear OtroGasto
    // ==========================================
    GuardarOtroGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var otroGasto = new OtroGasto_model_1.OtroGastoModel();
            var body = req.body;
            otroGasto.Id_OtroGasto = null;
            otroGasto.Descripcion = body.Descripcion;
            otroGasto.Total = body.Total;
            otroGasto.Diario = body.Diario;
            otroGasto.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('INSERT INTO OtroGasto set ?', otroGasto, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear OtroGasto',
                        errors: err,
                    });
                }
                otroGasto.Id_OtroGasto = datos.insertId;
                res.status(201).json({
                    ok: true,
                    OtroGasto: otroGasto,
                    Info: datos,
                });
            });
        });
    }
    // ==========================================
    // Actualizar Otro Gasto
    // ==========================================
    ActualizarOtroGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var otroGasto = new OtroGasto_model_1.OtroGastoModel();
            var body = req.body;
            otroGasto.Id_OtroGasto = id;
            otroGasto.Descripcion = body.Descripcion;
            otroGasto.Total = body.Total;
            otroGasto.Diario = body.Diario;
            otroGasto.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('UPDATE OtroGasto set ? WHERE Id_OtroGasto = ?', [otroGasto, id], (err, auxiliarGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    OtroGasto: otroGasto,
                    Info: auxiliarGuardado,
                });
            });
        });
    }
    // ============================================
    //   Borrar un OtroGasto por el id
    // ============================================
    EliminarOtroGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM OtroGasto WHERE Id_OtroGasto=?', [id], function (err, datos, fields) {
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
                    OtroGasto: datos,
                });
            });
        });
    }
}
const otroGastoController = new OtroGastoController();
exports.default = otroGastoController;
