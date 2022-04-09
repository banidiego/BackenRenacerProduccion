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
    // Obtener Información Para Tarjetas de Menu Inicio
    // ==========================================
    InfoInicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = req.params.Ano;
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('CALL `DatosMenuInicio`(?, ?)', [ano, id_Proyecto], function (err, resp, fields) {
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
    // Obtener Número de Solicitud (Maximo por Codigo_Proyecto y por Año)
    // ==========================================
    ListaAsientosNoCuadrados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('SELECT OperacionPrincipal.FechaOperacion,OperacionPrincipal.ResponsableGiro, OperacionPrincipal.CodigoOperacion,OperacionPrincipal.Mes,OperacionPrincipal.Ano,Operacion.Solicitud FROM OperacionPrincipal INNER JOIN Operacion ON OperacionPrincipal.Id_OperacionPrincipal=Operacion.Id_OperacionPrincipal WHERE OperacionPrincipal.Id_Proyecto=? AND OperacionPrincipal.Ano=? AND Cuadrado=0 GROUP BY OperacionPrincipal.Id_OperacionPrincipal ORDER BY OperacionPrincipal.FechaOperacion', [id_Proyecto, ano], function (err, resp, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Lista Asientos No Cuadrados',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Lista: resp,
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
