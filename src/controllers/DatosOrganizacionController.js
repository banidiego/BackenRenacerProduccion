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
const DatosOrganizacion_model_1 = require("../models/DatosOrganizacion.model");
class DatosOrganizacionController {
    // ==========================================
    // Filtrar TipoDocumento desde Codigo_TipoDocumento - Para obtener TipoRegistro
    // ==========================================
    CargarDatosOrganizacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_DatosOrganizacion = req.params.Id_DatosOrganizacion;
            yield database_1.default.query('SELECT * FROM DatosOrganizacion where Id_DatosOrganizacion = ?', [id_DatosOrganizacion], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error filtrando Tipo Documento',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    DatosOrganizacion: datos,
                });
            });
        });
    }
    // ==========================================
    // Actualizar SR
    // ==========================================
    ActualizarDatosOrganizacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.Id_DatosOrganizacion;
            const datosOrganizacion = new DatosOrganizacion_model_1.DatosOrganizacionModel();
            const body = req.body;
            datosOrganizacion.Id_DatosOrganizacion = id;
            datosOrganizacion.NombreOrganizacion = body.NombreOrganizacion;
            datosOrganizacion.RUC = body.RUC;
            datosOrganizacion.Logo = body.Logo;
            datosOrganizacion.Origen = body.Origen;
            yield database_1.default.query('UPDATE DatosOrganizacion set ? WHERE Id_DatosOrganizacion = ?', [datosOrganizacion, id], (err, datos) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al Actualizar Operación',
                        errors: err,
                    });
                }
                res.status(201).json({
                    ok: true,
                    DatosOrganizacion: datosOrganizacion,
                });
            });
        });
    }
}
const datosOrganizacionController = new DatosOrganizacionController();
exports.default = datosOrganizacionController;
