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
class TipoDocumentoIdentidadController {
    // ==========================================
    // Lista de TipoDocumentoIdentidad
    // ==========================================
    Lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM TipoDocumentoIdentidad ', function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Tipo Documento de Identidad',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TipoDocumentoIdentidad: datos,
                });
            });
        });
    }
    // ==========================================
    // Filtrar TipoDocumento desde Codigo_TipoDocumento - Para obtener TipoRegistro
    // ==========================================
    TipoDocumentoIdentidadCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo_TipoDocumentoIdentidad = req.params.Codigo_TipoDocumentoIdentidad;
            yield database_1.default.query('SELECT * FROM TipoDocumentoIdenidad where Codigo_TipoDocumentoIdentidad = ?', [codigo_TipoDocumentoIdentidad], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error filtrando Tipo Documento',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    TipoDocumentoIdentidad: datos,
                });
            });
        });
    }
}
const tipoDocumentoIdentidadController = new TipoDocumentoIdentidadController();
exports.default = tipoDocumentoIdentidadController;
