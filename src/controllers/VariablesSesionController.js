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
const variablesSesion_model_1 = require("../models/variablesSesion.model");
class VariablesSesionController {
    // ==========================================
    // Obtener Información de Variables de Sesión - Si no Exite lo crea
    // ==========================================
    VariableSesionId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = req.params.id;
            yield database_1.default.query('SELECT * FROM VariableSesion WHERE Id_Usuario = ?', [Id], function (err, datos, fields) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Variables de Sesión',
                        errors: err,
                    });
                }
                return res.status(200).json({
                    ok: true,
                    VariablesSesion: datos[0],
                });
            });
        });
    }
    // ==========================================
    // Actualizar Variables de Sesión
    // ==========================================
    ActualizarVariableSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            var variableSesion = new variablesSesion_model_1.VariableSesionModel();
            var body = req.body;
            variableSesion.Id_VariableSesion = id;
            variableSesion.NombreProyecto = body.NombreProyecto;
            variableSesion.Origen = body.Origen;
            variableSesion.Indice = body.Indice;
            variableSesion.Ano = body.Ano;
            variableSesion.Mes = body.Mes;
            variableSesion.Id_Usuario = body.Id_Usuario;
            yield database_1.default.query('UPDATE VariableSesion set ? WHERE Id_VariableSesion = ?', [variableSesion, id], (err, variableSesionGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar Auxiliar',
                        errors: err,
                    });
                }
                res.status(200).json({
                    ok: true,
                    VariableSesion: variableSesion,
                });
            });
        });
    }
}
const variablesSesionController = new VariablesSesionController();
exports.default = variablesSesionController;
