import { Request, Response } from 'express';

import pool from '../database';
import { VariableSesionModel } from '../models/variablesSesion.model';

class VariablesSesionController {
  // ==========================================
  // Obtener Información de Variables de Sesión - Si no Exite lo crea
  // ==========================================
  public async VariableSesionId(req: Request, res: Response) {
    const Id = req.params.id;
    await pool.query(
      'SELECT * FROM VariableSesion WHERE Id_Usuario = ?',
      [Id],

      function (err, datos, fields) {
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
      }
    );
  }

  // ==========================================
  // Actualizar Variables de Sesión
  // ==========================================
  public async ActualizarVariableSesion(req: Request, res: Response) {
    const id = req.params.id;

    var variableSesion = new VariableSesionModel();
    var body = req.body;

    variableSesion.Id_VariableSesion = id;
    variableSesion.NombreProyecto = body.NombreProyecto;
    variableSesion.Origen = body.Origen;
    variableSesion.Indice = body.Indice;
    variableSesion.Ano = body.Ano;
    variableSesion.Mes = body.Mes;
    variableSesion.Id_Usuario = body.Id_Usuario;

    await pool.query(
      'UPDATE VariableSesion set ? WHERE Id_VariableSesion = ?',
      [variableSesion, id],
      (err, variableSesionGuardado) => {
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
      }
    );
  }
}
const variablesSesionController = new VariablesSesionController();
export default variablesSesionController;
