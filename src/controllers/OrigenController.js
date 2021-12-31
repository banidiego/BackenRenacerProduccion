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
class OrigenController {
    // ==========================================
    // Obtener Origen por Año y Código de Proyecto para Tabla de Movimiento Diario (Año y Origen (Codigo_Proyecto))
    // ==========================================
    OrigenAnoIndice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            const indice = req.params.Indice;
            yield database_1.default.query('SELECT * FROM Origen WHERE Ano = ? and Indice=?', [ano, indice], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Origen',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Origen: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Origen por Año y Id de Proyecto para Select de Solicitud
    // ==========================================
    OrigenAnoIdProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            const id_Proyecto = req.params.Id_Proyecto;
            yield database_1.default.query('SELECT * FROM Origen WHERE Ano = ? and Id_Proyecto=?', [ano, id_Proyecto], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Origen',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Origen: datos,
                    ano,
                    id_Proyecto,
                });
            });
        });
    }
    // // ==========================================
    // // Obtener Origen por Año y Código de Proyecto para Tabla de Movimiento Diario (Año y Origen (Codigo_Proyecto))
    // // ==========================================
    // public async OrigenAnoCodigoProyecto(req: Request, res: Response) {
    //   const ano = parseInt(req.params.Ano);
    //   const origen = req.params.Origen;
    //   await pool.query(
    //     'SELECT * FROM Origen WHERE Ano = ? and Origen=?',
    //     [ano, origen],
    //     function (err, datos, fields) {
    //       if (err) {
    //         return res.status(500).json({
    //           ok: false,
    //           mensaje: 'Error cargando Variables de Sesión',
    //           errors: err,
    //         });
    //       }
    //       return res.status(200).json({
    //         ok: true,
    //         Origen: datos,
    //       });
    //     }
    //   );
    // }
    // ==========================================
    // Obtener Origen por Año y Nombre de Proyecto para cargar Menu información con Datos
    // ==========================================
    OrigenAnoNombreProyecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            const nombre = req.params.Nombre;
            yield database_1.default.query('SELECT * FROM Origen WHERE Ano = ? and Nombre=?', [ano, nombre], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Variables de Sesión',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Origen: datos,
                });
            });
        });
    }
    // ==========================================
    // Obtener Lista de Origenes (por Año) -- Para Menu Información
    // ==========================================
    OrigenAno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ano = parseInt(req.params.Ano);
            yield database_1.default.query('SELECT * FROM Origen WHERE Ano = ? Group by Origen, Nombre, Indice order by Indice', [ano], function (err, lista, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Lista de Origenes',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Año: ano,
                    Lista: lista,
                });
            });
        });
    }
    // ==========================================
    // Obtener Nombre de Origen desde TipoOrigen, Origen(Codigo_proyecto) y Año  (Para el Titulo de Asientos Mensuales)
    // ==========================================
    NombreOrigenTipoOrigenOrigenAno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoOrigen = req.params.TipoOrigen;
            const origen = req.params.Origen;
            const ano = parseInt(req.params.Ano);
            yield database_1.default.query('SELECT * FROM Origen WHERE Codigo_Origen = ? and Origen = ? and Ano = ?', [tipoOrigen, origen, ano], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Variables de Sesión',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    Origen: datos,
                });
            });
        });
    }
}
const origenController = new OrigenController();
exports.default = origenController;
