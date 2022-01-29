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
const CostoProducto_model_1 = require("../models/CostoProducto.model");
class CostoProductoController {
    // ==========================================
    // Obtener Lista de CostoProducto por Id_Empresa
    // ==========================================
    ListaCostoProductoIdEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.Id_Empresa;
            yield database_1.default.query('SELECT * FROM CostoProducto where Id_Empresa=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    CostoProductos: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener CostoProducto por Id_CostoProducto y Id_Empresa
    // ==========================================
    ObtenerCostoProductoIdCostoIdEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_CostoProducto = req.params.Id_CostoProducto;
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('SELECT * FROM CostoProducto where Id_CostoProducto=? and Id_Empresa=?', [id_CostoProducto, id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    CostoProducto: datos,
                });
            });
        });
    }
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
    // Crear un Costoproducto
    // ==========================================
    GuardarCostoProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var costoProducto = new CostoProducto_model_1.CostoProductoModel();
            var body = req.body;
            costoProducto.Id_CostoProducto = null;
            costoProducto.Descripcion = body.Descripcion;
            costoProducto.MinutosProduccion = body.MinutosProduccion;
            costoProducto.UnidadesProducidas = body.UnidadesProducidas;
            costoProducto.TotalCostosFijos = body.TotalCostosFijos;
            costoProducto.TotalCostoVariable = body.TotalCostoVariable;
            costoProducto.TiempoTotal = body.TiempoTotal;
            costoProducto.PrecioUnitarioVenta = body.PrecioUnitarioVenta;
            costoProducto.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('INSERT INTO CostoProducto set ?', costoProducto, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                costoProducto.Id_CostoProducto = datos.insertId;
                res.status(201).json({
                    ok: true,
                    CostoProducto: costoProducto,
                    Info: datos,
                });
            });
        });
    }
    // ==========================================
    // Actualizar CostosFijos por Id_CostoFijo y Id_Empresa
    // ==========================================
    ActualizarCostoFijo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id_CostoFijo = parseInt(req.params.Id_CostoFijo);
            const Id_Empresa = parseInt(req.params.Id_Empresa);
            var costoFijo = new CostoProducto_model_1.CostoProductoModel();
            var body = req.body;
            // costoFijo.Id_CostoFijo = Id_CostoFijo;
            // costoFijo.DiasLaborables = body.DiasLaborables;
            // costoFijo.ManoObraTotal = body.ManoObraTotal;
            // costoFijo.ManoObraDiario = body.ManoObraDiario;
            // costoFijo.ManoObraHora = body.ManoObraHora;
            // costoFijo.ManoObraMinuto = body.ManoObraMinuto;
            // costoFijo.AlquilerTotal = body.AlquilerTotal;
            // costoFijo.AlquilerDiario = body.AlquilerDiario;
            // costoFijo.LuzElectricaTotal = body.LuzElectricaTotal;
            // costoFijo.LuzElectricaDiario = body.LuzElectricaDiario;
            // costoFijo.AguaTotal = body.AguaTotal;
            // costoFijo.AguaDiario = body.AguaDiario;
            // costoFijo.ProductosVendidosMes = body.ProductosVendidosMes;
            // costoFijo.OtrosGastosTotal = body.OtrosGastosTotal;
            // costoFijo.OtrosGastosDiario = body.OtrosGastosDiario;
            // costoFijo.Id_Empresa = Id_Empresa;
            yield database_1.default.query('UPDATE CostosFijos set ? WHERE Id_CostoFijo = ? and Id_Empresa=?', [costoFijo, Id_CostoFijo, Id_Empresa], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    CostoFijo: datos,
                });
            });
        });
    }
}
const costoProductoController = new CostoProductoController();
exports.default = costoProductoController;
