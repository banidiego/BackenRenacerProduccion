import { Request, Response } from 'express';

import pool from '../database';

class ReportesGlobalesController {
  // ==========================================
  // Obtener Ventas y Gastos Para Tarjetas de Menu Inicio
  // ==========================================
  public async VentasGastosMesAnoIdEmpresaBannys(req: Request, res: Response) {
    const mes = req.params.Mes;
    const ano = req.params.Ano;
    const fecha = req.params.Fecha;
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'CALL `ReporteGastosVentas`(?, ?, ?, 1)',
      [mes, ano, fecha, id_Empresa],
      function (err, resp, fields) {
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
      }
    );
  }

  // ==========================================
  // Obtener GastosVentasUtilidadesMensuales de los últimos 12 meses
  // ==========================================
  public async GastosVentasUtilidadesMensuales(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const bannys = req.params.Bannys;

    await pool.query(
      'CALL UtilidadesAnuales(?,?);',
      [id_Empresa, bannys],
      function (err, resp, fields) {
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
      }
    );
  }

  // ==========================================
  // Obtener GastosVentasUtilidadesMensuales de los últimos 12 meses
  // ==========================================
  public async GastosVentasUtilidadesDiarios(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const bannys = req.params.Bannys;

    await pool.query(
      'CALL UtilidadesDiarias(?,?);',
      [id_Empresa, bannys],
      function (err, resp, fields) {
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
      }
    );
  }
}
const reportesGlobalesController = new ReportesGlobalesController();
export default reportesGlobalesController;
