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
const VentaSimple_model_1 = require("../models/VentaSimple.model");
class VentaSimpleController {
    // ==========================================
    // Obtener Las Ventas Simples del Mes por Mes, Año, Id_Empresa
    // ==========================================
    VentasMesAnoIdEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mes = req.params.Mes;
            const ano = req.params.Ano;
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('SELECT Fecha, SUM(Monto) as Total FROM `VentaSimple` WHERE Mes=? and Ano=? and Id_Empresa=? GROUP BY DATE(Fecha) ORDER BY Fecha DESC', [mes, ano, id_Empresa], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error fltrando Venta Simple',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Ventas: datos,
                });
            });
        });
    }
    // =======================================================
    // Listado de Registros por Fecha e Id_Empresa
    // =======================================================
    RegistrosFechaIdEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = req.params.Fecha;
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('SELECT * FROM VentaSimple WHERE Fecha= ? and Id_Empresa=?', [fecha, id_Empresa], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Registros',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Registros: resp,
                    Fecha: fecha,
                });
            });
        });
    }
    // =======================================================
    // Suma de Registros por Fecha e Id_Empresa
    // =======================================================
    SumaRegistrosFechaIdEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = req.params.Fecha;
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('SELECT SUM(Monto) as Total FROM VentaSimple WHERE Fecha= ? and Id_Empresa=?', [fecha, id_Empresa], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Registros',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Total: resp[0].Total,
                });
            });
        });
    }
    // =======================================================
    // Ventas del Día según Fecha, Id_Empresa y Bannys o Zendy
    // =======================================================
    VentasDiaFechaIdEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = req.params.Fecha;
            const id_Empresa = req.params.Id_Empresa;
            const bannys = req.params.Bannys;
            yield database_1.default.query('SELECT SUM(Monto) as Total FROM VentaSimple WHERE Fecha= ? and Id_Empresa=? and Bannys=?', [fecha, id_Empresa, bannys], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Registros',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TotalVentas: resp[0].Total,
                });
            });
        });
    }
    // =======================================================
    // Ventas Mensuales de los últimos 12 meses
    // =======================================================
    VentasMensuales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            const bannys = req.params.Bannys;
            yield database_1.default.query('Select (left(upper(Mes),3)) as Mes, sum(Monto) as TotalMes from VentaSimple where Bannys=? and Id_Empresa=? and  Fecha > DATE_SUB(now(), INTERVAL 12 MONTH) group by Mes  Order by Fecha', [bannys, id_Empresa], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Registros',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    VentasMensuales: resp,
                });
            });
        });
    }
    // =======================================================
    // Ventas de los últimos 12 dias
    // =======================================================
    VentasDiarias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            const bannys = req.params.Bannys;
            yield database_1.default.query('Select  CONCAT(Date_Format(Fecha,"%d"),"-",left(Mes,3)) as Fecha, sum(Monto) as Total,Fecha as FechaNormal from VentaSimple where Bannys=? and Id_Empresa=?  group by Fecha  Order by Ano,FechaNormal LIMIT 12', [bannys, id_Empresa], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Registros',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    VentasDiarias: resp,
                });
            });
        });
    }
    // =======================================================
    // Ventas diaria de un periodo
    // =======================================================
    VentasPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            const bannys = req.params.Bannys;
            var FechaInicial;
            var FechaFinal;
            var body = req.body;
            FechaInicial = body.FechaInicial;
            FechaFinal = body.FechaFinal;
            yield database_1.default.query('SELECT CONCAT(Date_Format(Fecha,"%d"),"-",left(Mes,3)) as Fecha, sum(Monto) as Monto FROM VentaSimple WHERE Fecha BETWEEN ? AND ? and Id_Empresa=? and Bannys=? GROUP BY Fecha ORDER BY Fecha;', [FechaInicial, FechaFinal, id_Empresa, bannys], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Registros',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    VentasDiarias: resp,
                });
            });
        });
    }
    // ==========================================
    // Guardar Nueva Venta Simple
    // ==========================================
    GuardarVentaSimple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var ventaSimple = new VentaSimple_model_1.VentaSimpleModel();
            var body = req.body;
            ventaSimple.Id_VentaSimple = null;
            ventaSimple.Descripcion = body.Descripcion;
            ventaSimple.Fecha = body.Fecha;
            ventaSimple.Monto = body.Monto;
            ventaSimple.Mes = body.Mes;
            ventaSimple.Ano = body.Ano;
            ventaSimple.Bannys = body.Bannys;
            ventaSimple.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('INSERT INTO VentaSimple set ?', ventaSimple, (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Guardar Venta Simple',
                        errors: err,
                    });
                }
                ventaSimple.Id_VentaSimple = datos.insertId;
                res.status(201).json({
                    ok: true,
                    VentaSimple: ventaSimple,
                    Info: datos,
                });
            });
        });
    }
    // ==========================================
    // Actualizar Venta Simple
    // ==========================================
    ActualizarVentaSimple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var ventaSimple = new VentaSimple_model_1.VentaSimpleModel();
            var body = req.body;
            ventaSimple.Id_VentaSimple = id;
            ventaSimple.Descripcion = body.Descripcion;
            ventaSimple.Fecha = body.Fecha;
            ventaSimple.Monto = body.Monto;
            ventaSimple.Mes = body.Mes;
            ventaSimple.Ano = body.Ano;
            ventaSimple.Bannys = body.Bannys;
            ventaSimple.Id_Empresa = body.Id_Empresa;
            yield database_1.default.query('UPDATE VentaSimple set ? WHERE Id_VentaSimple = ?', [ventaSimple, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Modificar Venta Simple',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    VentaSimple: ventaSimple,
                    Info: datos,
                });
            });
        });
    }
    // ============================================
    //   Borrar Venta Simple por el id
    // ============================================
    EliminarVentaSimple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('DELETE FROM VentaSimple WHERE Id_VentaSimple=?', [id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al Eliminar Venta Simple',
                        errors: err,
                    });
                }
                if (!datos) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'No existe una Venta Simple con ese id',
                        errors: { message: 'No existe una Venta Simple con ese id' },
                    });
                }
                res.status(200).json({
                    ok: true,
                    VentaSimple: datos,
                    Id: id,
                });
            });
        });
    }
}
const ventaSimpleController = new VentaSimpleController();
exports.default = ventaSimpleController;
