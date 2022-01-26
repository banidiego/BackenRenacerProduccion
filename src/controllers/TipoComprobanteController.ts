import { Request, Response } from 'express';

import pool from '../database';
import { TipoDocumentoModel } from '../models/TipoDocumento.model';

class TipoComprobanteController {
  // ==========================================
  // Lista Tipo de Comprobante
  // ==========================================
  public async Lista(req: Request, res: Response) {
    await pool.query(
      'SELECT * FROM TipoDocumento ',

      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Tipo Documento',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          TipoComprobantes: datos,
        });
      }
    );
  }

  // ==========================================
  // Filtrar TipoDocumento desde Codigo_TipoDocumento - Para obtener TipoRegistro
  // ==========================================
  public async TipoDocumentoCodigo(req: Request, res: Response) {
    const codigo_TipoDocumento = req.params.Codigo_TipoDocumento;

    await pool.query(
      'SELECT * FROM TipoDocumento where Codigo_TipoDocumento = ?',
      [codigo_TipoDocumento],

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
          TipoDocumento: datos,
        });
      }
    );
  }
}
const tipoComprobanteController = new TipoComprobanteController();
export default tipoComprobanteController;
