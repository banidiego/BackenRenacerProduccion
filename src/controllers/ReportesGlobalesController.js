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
class ReportesGlobalesController {
    // ==========================================
    // Obtener Ventas y Gastos Para Tarjetas de Menu Inicio
    // ==========================================
    VentasGastosMesAnoIdEmpresaBannys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mes = req.params.Mes;
            const ano = req.params.Ano;
            const fecha = req.params.Fecha;
            const id_Empresa = req.params.Id_Empresa;
            yield database_1.default.query('CALL `ReporteGastosVentas`(?, ?, ?, 1)', [mes, ano, fecha, id_Empresa], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Tabla',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Reportes: resp,
                });
            });
        });
    }
    // ==========================================
    // Obtener GastosVentasUtilidadesMensuales de los últimos 12 meses
    // ==========================================
    GastosVentasUtilidadesMensuales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            const bannys = req.params.Bannys;
            yield database_1.default.query('CALL UtilidadesAnuales(?,?);', [id_Empresa, bannys], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Tabla',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Reportes: resp,
                });
            });
        });
    }
    // ==========================================
    // Obtener GastosVentasUtilidadesMensuales de los últimos 12 meses
    // ==========================================
    GastosVentasUtilidadesDiarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Empresa = req.params.Id_Empresa;
            const bannys = req.params.Bannys;
            yield database_1.default.query('CALL UtilidadesDiarias(?,?);', [id_Empresa, bannys], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Tabla',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Reportes: resp,
                });
            });
        });
    }
}
const reportesGlobalesController = new ReportesGlobalesController();
exports.default = reportesGlobalesController;
