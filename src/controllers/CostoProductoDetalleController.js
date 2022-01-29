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
const CostoProductoDetalle_model_1 = require("../models/CostoProductoDetalle.model");
class CostoProductoDetalleController {
    // ==========================================
    //  Lista de CostoProductoDetalle por Id_CostoProducto
    // ==========================================
    ListaCostoProductoIdCostoProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.Id_CostoProducto;
            yield database_1.default.query('SELECT * FROM CostoProductoDetalle where Id_CostoProducto=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    CostosProductoDetalle: datos,
                });
            });
        });
    }
    // ==========================================
    // Cargar Tabla de Costo de Producto Detalle (Inner Join MateriaPrima y Categoria)
    // ==========================================
    TablaCostoProductoDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_CostoProducto = req.params.Id_CostoProducto;
            yield database_1.default.query('SELECT CostoProductoDetalle.Id_CostoProductoDetalle, CostoProductoDetalle.Id_CostoProducto,CostoProductoDetalle.Cantidad,CostoProductoDetalle.Monto, MateriaPrima.Descripcion,MateriaPrima.Unidad,MateriaPrima.ValorConMerma,Categoria.Descripcion as Categoria FROM CostoProductoDetalle INNER JOIN MateriaPrima ON CostoProductoDetalle.Id_MateriaPrima=MateriaPrima.Id_MateriaPrima INNER JOIN Categoria ON MateriaPrima.Id_Categoria = Categoria.Id_Categoria WHERE Id_CostoProducto = ?', [id_CostoProducto], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error en la Base de Datos cargando Auxiliares',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Tabla: datos,
                });
            });
        });
    }
    // ==========================================
    //  Suma de Lista de CostoProductoDetalle por Id_CostoProducto
    // ==========================================
    SumaListaCostoProductoIdCostoProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.Id_CostoProducto;
            yield database_1.default.query('SELECT sum(Monto) as Total FROM CostoProductoDetalle WHERE Id_CostoProducto=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Total: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener CostoProductoDEtalle por Id_CostoProductoDetalle
    // ==========================================
    CostoProductoDetalleId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_CostoProductoDetalle = req.params.Id_CostoProductoDetalle;
            yield database_1.default.query('select * from CostoProductoDetalle where Id_CostoProductoDetalle=?', [id_CostoProductoDetalle], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Auxiliar',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    CostoProductoDetalle: datos,
                });
            });
        });
    }
    // ==========================================
    // Crear un Costoproducto
    // ==========================================
    GuardarCostoProductoDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var costoProductoDetalle = new CostoProductoDetalle_model_1.CostoProductoDetalleModel();
            var body = req.body;
            costoProductoDetalle.Id_CostoProductoDetalle = null;
            costoProductoDetalle.Id_CostoProducto = body.Id_CostoProducto;
            costoProductoDetalle.Id_MateriaPrima = body.Id_MateriaPrima;
            costoProductoDetalle.Cantidad = body.Cantidad;
            costoProductoDetalle.Monto = body.Monto;
            yield database_1.default.query('INSERT INTO CostoProductoDetalle set ?', costoProductoDetalle, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear Auxiliar',
                        errors: err,
                    });
                }
                costoProductoDetalle.Id_CostoProductoDetalle = datos.insertId;
                res.status(201).json({
                    ok: true,
                    CostoProducto: costoProductoDetalle,
                    Info: datos,
                });
            });
        });
    }
    // ==========================================
    // Actualizar CostoProductoDetalle
    // ==========================================
    ActualizarCostoProductoDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id_CostoProductoDetalle = parseInt(req.params.Id_CostoProductoDetalle);
            var costoProductoDetalle = new CostoProductoDetalle_model_1.CostoProductoDetalleModel();
            var body = req.body;
            costoProductoDetalle.Id_CostoProductoDetalle = null;
            costoProductoDetalle.Id_CostoProducto = body.Id_CostoProducto;
            costoProductoDetalle.Id_MateriaPrima = body.Id_MateriaPrima;
            costoProductoDetalle.Cantidad = body.Cantidad;
            costoProductoDetalle.Monto = body.Monto;
            yield database_1.default.query('UPDATE CostoProductoDetalle set ? WHERE Id_CostoProductoDetalle = ?', [costoProductoDetalle, Id_CostoProductoDetalle], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear CostoProductoDetalle',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    CostoProductoDetalle: datos,
                });
            });
        });
    }
}
const costoProductoDetalleController = new CostoProductoDetalleController();
exports.default = costoProductoDetalleController;
