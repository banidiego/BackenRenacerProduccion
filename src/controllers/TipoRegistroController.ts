import { Request, Response } from 'express';

import pool from '../database';
import { TipoRegistroModel } from '../models/TipoRegistro.model';

class TipoRegistroController {
  // ==========================================
  // Lista de Tipo de Compra
  // ==========================================
  public async Lista(req: Request, res: Response) {
    await pool.query(
      'SELECT * FROM TipoRegistro order by Codigo_TipoRegistro',

      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Tipo de Compra',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          TipoRegistros: datos,
        });
      }
    );
  }
}
const tipoRegistroController = new TipoRegistroController();
export default tipoRegistroController;
