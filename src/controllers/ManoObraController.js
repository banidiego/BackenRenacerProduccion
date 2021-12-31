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
const ManoObra_model_1 = require("../models/ManoObra.model");
class ManoObraController {
    // ==========================================
    // Obtener Lista de ManoObra por Id_Empresa
    // ==========================================
    ListaManoObraId_Empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('SELECT * FROM ManoObra where Id_Empresa=?', [id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    ManoObra: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Suma Mano de Obra
    // ==========================================
    SumaManoObraId_Empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('SELECT sum(Salario) as Salario FROM ManoObra where Id_Empresa=?', [id_Empresa], function (err, datos, fields) {
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
    // Crear un nuevo Mano Obra
    // ==========================================
    GuardarManoObra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var manoObra = new ManoObra_model_1.ManoObraModel();
            var body = req.body;
            manoObra.Id_ManoObra = null;
            manoObra.ApellidosNombres = body.ApellidosNombres;
            manoObra.Salario = body.Salario;
            manoObra.DiasLaborales = body.DiasLaborales;
            manoObra.HorasDiarias = body.HorasDiarias;
            manoObra.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('INSERT INTO ManoObra set ?', manoObra, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                manoObra.Id_ManoObra = datos.insertId;
                res.status(201).json({
                    ok: true,
                    ManoObra: manoObra,
                });
            });
        });
    }
    // ==========================================
    // Actualizar Mano Obra
    // ==========================================
    ActualizarManoObra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var manoObra = new ManoObra_model_1.ManoObraModel();
            var body = req.body;
            manoObra.Id_ManoObra = id;
            manoObra.ApellidosNombres = body.ApellidosNombres;
            manoObra.Salario = body.Salario;
            manoObra.DiasLaborales = body.DiasLaborales;
            manoObra.HorasDiarias = body.HorasDiarias;
            manoObra.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('UPDATE ManoObra set ? WHERE Id_ManoObra = ?', [manoObra, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    ManoObra: datos,
                });
            });
        });
    }
    // ============================================
    //   Borrar un Mano Obra por el id
    // ============================================
    EliminarManoObra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM ManoObra WHERE Id_ManoObra=?', [id], function (err, datos, fields) {
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
                    ManoObra: datos,
                });
            });
        });
    }
}
const manoObraController = new ManoObraController();
exports.default = manoObraController;
