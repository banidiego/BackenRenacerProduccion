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
const MateriaPrima_model_1 = require("../models/MateriaPrima.model");
class MateriaPrimaController {
    // ==========================================
    // Obtener Lista de Materia Prima por Id_Empresa
    // ==========================================
    ListaTablaMateriaPrimaId_Empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('select MateriaPrima.Id_MateriaPrima,MateriaPrima.Descripcion,MateriaPrima.ValorCompra,MateriaPrima.Unidad,MateriaPrima.FactorConversion,MateriaPrima.FactorMerma,MateriaPrima.ValorConMerma,Categoria.Descripcion as Categoria from MateriaPrima INNER JOIN Categoria on MateriaPrima.Id_Categoria=Categoria.Id_Categoria where MateriaPrima.Id_Empresa=?', [id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    MateriaPrima: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de Materia Prima por Id_Empresa
    // ==========================================
    ListaMateriaPrimaId_Empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('select * from MateriaPrima where Id_Empresa=?', [id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    MateriaPrima: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Materia Prima por Descripcion e Id_Empresa
    // ==========================================
    MateriaPrimaDescripcionId_Empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            const Descripcion_MateriaPrima = req.params.Descripcion_MateriaPrima;
            yield database_1.default.query('select * from MateriaPrima where Descripcion=? and Id_Empresa=?', [Descripcion_MateriaPrima, id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    MateriaPrima: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Materia Prima por Id_materiaPrima e Id_Empresa
    // ==========================================
    MateriaPrimaId_MateriaPrimaId_Empresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            const id_MateriaPrima = req.params.Id_MateriaPrima;
            yield database_1.default.query('select * from MateriaPrima where Id_MateriaPrima=? and Id_Empresa=?', [id_MateriaPrima, id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    MateriaPrima: datos,
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
    // Crear un nueva materia Prima
    // ==========================================
    GuardarMateriaPrima(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var materiaPrima = new MateriaPrima_model_1.MateriaPrimaModel();
            var body = req.body;
            materiaPrima.Id_MateriaPrima = null;
            materiaPrima.Id_Categoria = body.Id_Categoria;
            materiaPrima.Descripcion = body.Descripcion;
            materiaPrima.ValorCompra = body.ValorCompra;
            materiaPrima.Unidad = body.Unidad;
            materiaPrima.FactorConversion = body.FactorConversion;
            materiaPrima.FactorMerma = body.FactorMerma;
            materiaPrima.ValorConMerma = body.ValorConMerma;
            materiaPrima.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('INSERT INTO MateriaPrima set ?', materiaPrima, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Materia Prima',
                        errors: err,
                    });
                }
                materiaPrima.Id_MateriaPrima = datos.insertId;
                res.status(201).json({
                    ok: true,
                    MateriaPrima: materiaPrima,
                    Info: datos,
                });
            });
        });
    }
    // ==========================================
    // Actualizar Materia Prima
    // ==========================================
    ActualizarMateriaPrima(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var materiaPrima = new MateriaPrima_model_1.MateriaPrimaModel();
            var body = req.body;
            materiaPrima.Id_MateriaPrima = id;
            materiaPrima.Id_Categoria = body.Id_Categoria;
            materiaPrima.Descripcion = body.Descripcion;
            materiaPrima.ValorCompra = body.ValorCompra;
            materiaPrima.Unidad = body.Unidad;
            materiaPrima.FactorConversion = body.FactorConversion;
            materiaPrima.FactorMerma = body.FactorMerma;
            materiaPrima.ValorConMerma = body.ValorConMerma;
            materiaPrima.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('UPDATE MateriaPrima set ? WHERE Id_MateriaPrima = ?', [materiaPrima, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    MateriaPrima: materiaPrima,
                    Info: datos,
                });
            });
        });
    }
    // ============================================
    //   Borrar un MateriaPrima por el id
    // ============================================
    EliminarMateriaPrima(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM MateriaPrima WHERE Id_MateriaPrima=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al borrar MateriaPrima',
                        errors: err,
                    });
                }
                if (!datos) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'No existe una MateriaPrima con ese id',
                        errors: { message: 'No existe una MateriaPrima con ese id' },
                    });
                }
                res.status(200).json({
                    ok: true,
                    materiaPrima: datos,
                });
            });
        });
    }
}
const materiaPrimaController = new MateriaPrimaController();
exports.default = materiaPrimaController;
