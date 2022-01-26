import { Request, Response } from 'express';

import pool from '../database';
import { PlanProyectoModel } from '../models/PlanProyecto.model';

class PlanProyectoController {
  // ==========================================
  // Obtener todos el PlanProyecto filtrados por Codigo_PlanProyecto
  // ==========================================
  public async ListaCodigoPlanProyecto(req: Request, res: Response) {
    const ruc = req.params.Ruc;

    await pool.query(
      'SELECT * FROM PlanProyecto WHERE RUC = ? ',
      [ruc],

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
          Auxiliar: datos,
        });
      }
    );
  }

  // ==========================================
  // Obtener todos PlanProyecto
  // ==========================================
  public async ListaAnoCodigoProyecto(req: Request, res: Response) {
    const ano = parseInt(req.params.Ano);
    const id_Proyecto = req.params.Id_Proyecto;

    await pool.query(
      'SELECT * FROM PlanProyecto WHERE Ano = ? and Id_Proyecto =  ? and Movimiento = 1',
      [ano, id_Proyecto],

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
          PlanProyecto: datos,
          Año: ano,
          Id_Proyecto: id_Proyecto,
        });
      }
    );
  }

  // ==========================================
  // Crear un nuevo Plan de Proyecto
  // ==========================================
  public async GuardarPlanProyecto(req: Request, res: Response) {
    var planproyecto = new PlanProyectoModel();
    var body = req.body;

    planproyecto.Id_PlanProyecto = null;
    planproyecto.Codigo_PlanProyecto = body.Codigo_PlanProyecto;
    planproyecto.Nombre_PlanProyecto = body.Nombre_PlanProyecto;
    planproyecto.EneroSolesP = body.EneroSolesP;
    planproyecto.FebreroSolesP = body.FebreroSolesP;
    planproyecto.MarzoSolesP = body.MarzoSolesP;
    planproyecto.AbrilSolesP = body.AbrilSolesP;
    planproyecto.MayoSolesP = body.MayoSolesP;
    planproyecto.JunioSolesP = body.JunioSolesP;
    planproyecto.JulioSolesP = body.JulioSolesP;
    planproyecto.AgostoSolesP = body.AgostoSolesP;
    planproyecto.SeptiembreSolesP = body.SeptiembreSolesP;
    planproyecto.OctubreSolesP = body.OctubreSolesP;
    planproyecto.NoviembreSolesP = body.NoviembreSolesP;
    planproyecto.DiciembreSolesP = body.DiciembreSolesP;
    planproyecto.EneroDolaresP = body.EneroDolaresP;
    planproyecto.FebreroDolaresP = body.FebreroDolaresP;
    planproyecto.MarzoDolaresP = body.MarzoDolaresP;
    planproyecto.AbrilDolaresP = body.AbrilDolaresP;
    planproyecto.MayoDolaresP = body.MayoDolaresP;
    planproyecto.JunioDolaresP = body.JunioDolaresP;
    planproyecto.JulioDolaresP = body.JulioDolaresP;
    planproyecto.AgostoDolaresP = body.AgostoDolaresP;
    planproyecto.SeptiembreDolaresP = body.SeptiembreDolaresP;
    planproyecto.OctubreDolaresP = body.OctubreDolaresP;
    planproyecto.NoviembreDolaresP = body.NoviembreDolaresP;
    planproyecto.DiciembreDolaresP = body.DiciembreDolaresP;
    planproyecto.EneroSolesG = body.EneroSolesG;
    planproyecto.FebreroSolesG = body.FebreroSolesG;
    planproyecto.MarzoSolesG = body.MarzoSolesG;
    planproyecto.AbrilSolesG = body.AbrilSolesG;
    planproyecto.MayoSolesG = body.MayoSolesG;
    planproyecto.JunioSolesG = body.JunioSolesG;
    planproyecto.JulioSolesG = body.JulioSolesG;
    planproyecto.AgostoSolesG = body.AgostoSolesG;
    planproyecto.SeptiembreSolesG = body.SeptiembreSolesG;
    planproyecto.OctubreSolesG = body.OctubreSolesG;
    planproyecto.NoviembreSolesG = body.NoviembreSolesG;
    planproyecto.DiciembreSolesG = body.DiciembreSolesG;
    planproyecto.EneroDolaresG = body.EneroDolaresG;
    planproyecto.FebreroDolaresG = body.FebreroDolaresG;
    planproyecto.MarzoDolaresG = body.MarzoDolaresG;
    planproyecto.AbrilDolaresG = body.AbrilDolaresG;
    planproyecto.MayoDolaresG = body.MayoDolaresG;
    planproyecto.JunioDolaresG = body.JunioDolaresG;
    planproyecto.JulioDolaresG = body.JulioDolaresG;
    planproyecto.AgostoDolaresG = body.AgostoDolaresG;
    planproyecto.SeptiembreDolaresG = body.SeptiembreDolaresG;
    planproyecto.OctubreDolaresG = body.OctubreDolaresG;
    planproyecto.NoviembreDolaresG = body.NoviembreDolaresG;
    planproyecto.DiciembreDolaresG = body.DiciembreDolaresG;
    planproyecto.Id_Proyecto = body.Id_Proyecto;
    planproyecto.Ano = body.Ano;
    planproyecto.Movimiento = body.Movimiento;
    await pool.query(
      'INSERT INTO PlanProyecto set ?',
      planproyecto,
      (err, PlanProyectoGuardado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear Auxiliar',
            errors: err,
          });
        }

        planproyecto.Id_PlanProyecto = PlanProyectoGuardado.insertId;

        res.status(201).json({
          ok: true,
          PlanProyecto: planproyecto,
        });
      }
    );
  }
}
const planProyectoController = new PlanProyectoController();
export default planProyectoController;
