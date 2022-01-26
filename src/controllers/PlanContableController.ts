import { Request, Response } from 'express';

import pool from '../database';
import { PlanContableModel } from '../models/PlanContable.model';

class PlanContableController {
  // ==========================================
  // Obtener todos el PlanContable filtrados por Codigo_PlanCuenta y Año
  // ==========================================
  public async ListaCodigoPlanCuentaAno(req: Request, res: Response) {
    const codigo_PlanCuenta = req.params.Codigo_PlanCuenta;
    const ano = parseInt(req.params.Ano);

    await pool.query(
      'SELECT * FROM PlanContable WHERE Codigo_PlanCuenta = ? and Ano = ?',
      [codigo_PlanCuenta, ano],

      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error fltrando PlanContable',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          PlanContable: datos,
        });
      }
    );
  }

  // ==========================================
  // Obtener todos PlanProyecto
  // ==========================================
  public async ListaAno(req: Request, res: Response) {
    const ano = parseInt(req.params.Ano);

    await pool.query(
      'SELECT * FROM PlanContable WHERE Ano = ? and Movimiento = 1',
      [ano],

      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error fltrando Auxiliar',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          PlanContable: datos,
        });
      }
    );
  }

  // ==========================================
  // Crear un nuevo Plan Contable
  // ==========================================
  public async GuardarPlanContable(req: Request, res: Response) {
    var planContable = new PlanContableModel();
    var body = req.body;

    planContable.Id_PlanContable = null;
    planContable.Codigo_PlanCuenta = body.Codigo_PlanCuenta;
    planContable.Nombre_PlanCuenta = body.Nombre_PlanCuenta;
    planContable.DebeApertura = body.DebeApertura;
    planContable.HaberApertura = body.HaberApertura;
    planContable.DebeMovimientoAnual = body.DebeMovimientoAnual;
    planContable.HaberMovimientoAnual = body.HaberMovimientoAnual;
    planContable.DeudorSaldos = body.DeudorSaldos;
    planContable.AcreedorSaldos = body.AcreedorSaldos;
    planContable.DeudorSaldosAjustados = body.DeudorSaldosAjustados;
    planContable.AcreedorSaldosAjustados = body.AcreedorSaldosAjustados;
    planContable.ActivoBG = body.ActivoBG;
    planContable.PasivoBG = body.PasivoBG;
    planContable.PerdidaFuncion = body.PerdidaFuncion;
    planContable.GananciaFuncion = body.GananciaFuncion;
    planContable.PerdidaNaturaleza = body.PerdidaNaturaleza;
    planContable.GananciaNaturaleza = body.GananciaNaturaleza;
    planContable.Movimiento = body.Movimiento;
    planContable.CuentaActiva = body.CuentaActiva;
    planContable.Id_Proyecto = body.Id_Proyecto;
    planContable.Ano = body.Ano;

    await pool.query(
      'INSERT INTO PlanContable set ?',
      planContable,
      (err, resp) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear Auxiliar',
            errors: err,
          });
        }

        planContable.Id_PlanContable = resp.insertId;

        res.status(201).json({
          ok: true,
          PlanContable: planContable,
        });
      }
    );
  }
}
const planContableController = new PlanContableController();
export default planContableController;
