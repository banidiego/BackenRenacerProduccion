import { Request, Response } from 'express';

import pool from '../database';
import { MedioPagoModel } from '../models/MedioPago.model';

class MedioPagoController {
  // ==========================================
  // Lista de Medio de Pagos
  // ==========================================
  public async Lista(req: Request, res: Response) {
    await pool.query('SELECT * FROM MedioPago', function (err, datos, fields) {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error cargando Medio de Pago',
          errors: err,
        });
      }

      return res.status(200).json({
        ok: true,
        MedioPagos: datos,
      });
    });
  }
}

const medioPagoController = new MedioPagoController();
export default medioPagoController;
