import { Request, Response } from 'express';

import pool from '../database';
import { TipoDocumentoIdentidadModel } from '../models/TipoDocumentoIdentidad.model';

class TipoDocumentoIdentidadController {
  // ==========================================
  // Lista de TipoDocumentoIdentidad
  // ==========================================
  public async Lista(req: Request, res: Response) {
    await pool.query(
      'SELECT * FROM TipoDocumentoIdentidad ',

      function (err, datos, fields) {
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
      }
    );
  }

  // ==========================================
  // Filtrar TipoDocumento desde Codigo_TipoDocumento - Para obtener TipoRegistro
  // ==========================================
  public async TipoDocumentoIdentidadCodigo(req: Request, res: Response) {
    const codigo_TipoDocumentoIdentidad =
      req.params.Codigo_TipoDocumentoIdentidad;

    await pool.query(
      'SELECT * FROM TipoDocumentoIdenidad where Codigo_TipoDocumentoIdentidad = ?',
      [codigo_TipoDocumentoIdentidad],

      function (err, datos, fields) {
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
      }
    );
  }
}
const tipoDocumentoIdentidadController = new TipoDocumentoIdentidadController();
export default tipoDocumentoIdentidadController;
