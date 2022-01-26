import { Request, Response } from 'express';

import pool from '../database';
import { DetalleSRModel } from '../models/DetalleSR.model';

class DetalleSRController {
  // ==========================================
  // Obtener Lista de DetalleSR por Id_SR
  // ==========================================
  public async ListaDetalleSRIdSR(req: Request, res: Response) {
    const id_SR = req.params.Id_SR;

    await pool.query(
      'SELECT * FROM DetalleSR WHERE Id_SR = ?',
      [id_SR],
      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando los DetalleSR',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          DetalleSR: datos,
        });
      }
    );
  }

  // ==========================================
  // Suma de Total de Gasto por SR
  // ==========================================
  public async SumaTotalGastoIdSR(req: Request, res: Response) {
    const id_SR = req.params.Id_SR;

    await pool.query(
      'SELECT sum(Gasto)as TotalGasto, sum(Presupuesto) as TotalPresupuesto FROM DetalleSR WHERE Id_SR = ? ',
      [id_SR],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Datos de DetalleSR',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Totales: resp,
        });
      }
    );
  }

  // ==========================================
  // Obtener Lista de DetalleSR por Id_DetalleSR
  // ==========================================
  public async ListaDetalleSRIdDetalleSR(req: Request, res: Response) {
    const id_DetalleSR = req.params.Id_DetalleSR;

    await pool.query(
      'SELECT * FROM DetalleSR WHERE Id_DetalleSR = ?',
      [id_DetalleSR],
      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando los DetalleSR',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          DetalleSR: datos,
        });
      }
    );
  }

  // ==========================================
  // Crear DetalleSR
  // ==========================================
  public async GuardarDetalleSR(req: Request, res: Response) {
    var detalleSR = new DetalleSRModel();
    var body = req.body;

    detalleSR.Id_DetalleSR = null;
    detalleSR.Id_SR = body.Id_SR;
    detalleSR.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
    detalleSR.Presupuesto = body.Presupuesto;
    detalleSR.Gasto = body.Gasto;
    detalleSR.Actividad = body.Actividad;

    await pool.query('INSERT INTO DetalleSR set ?', detalleSR, (err, datos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al crear DetalleSR',
          errors: err,
        });
      }

      res.status(201).json({
        ok: true,
        DetalleSR: datos,
      });
    });
  }

  // ==========================================
  // Actualizar DetalleSR
  // ==========================================
  public async ActualizarDetalleSR(req: Request, res: Response) {
    const id = req.params.id;

    var detalleSR = new DetalleSRModel();
    var body = req.body;

    detalleSR.Id_DetalleSR = id;
    detalleSR.Id_SR = body.Id_SR;
    detalleSR.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
    detalleSR.Presupuesto = body.Presupuesto;
    detalleSR.Gasto = body.Gasto;
    detalleSR.Actividad = body.Actividad;

    await pool.query(
      'UPDATE DetalleSR set ? WHERE Id_DetalleSR = ?',
      [detalleSR, id],
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al Actualizar DetalleSR',
            errors: err,
          });
        }

        res.status(201).json({
          ok: true,
          DetalleSR: datos,
        });
      }
    );
  }

  // ============================================
  //   Eliminar DetalleSR por Id_DetalleSR
  // ============================================
  public async EliminarDetalleSR(req: Request, res: Response) {
    const id = req.params.id;

    await pool.query(
      'DELETE FROM DetalleSR WHERE Id_DetalleSR=?',
      [id],

      function (err, dato, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al borrar Operacion',
            errors: err,
          });
        }

        if (!dato) {
          return res.status(400).json({
            ok: false,
            mensaje: 'No existe Operacion con ese id',
            errors: { message: 'No existe una Operacion con ese id' },
          });
        }
        0;

        res.status(200).json({
          ok: true,
          DetalleSR: dato,
        });
      }
    );
  }
}

const detalleSRController = new DetalleSRController();
export default detalleSRController;
