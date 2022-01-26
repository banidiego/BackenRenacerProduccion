import { Request, Response } from 'express';

import pool from '../database';
import { OtroGastoModel } from '../models/OtroGasto.model';

class OtroGastoController {
  // ==========================================
  // Obtener Lista de OtroGasto por Id_Empresa
  // ==========================================
  public async ListaOtroGastoId_Empresa(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT * FROM OtroGasto where Id_Empresa=?',
      [id_Empresa],

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
          OtroGasto: datos,
        });
      }
    );
  }

  // ==========================================
  // Obtener Suma Otro Gasto
  // ==========================================
  public async SumaOtroGastoId_Empresa(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT sum(Total) as Total FROM OtroGasto where Id_Empresa=?',
      [id_Empresa],

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
          Suma: datos,
        });
      }
    );
  }

  // // ==========================================
  // // Obtener todos los Auxiliares filtrados por Razón Social
  // // ==========================================
  // public async ListaAuxiliaresRazonSocial(req: Request, res: Response) {
  //   const razonSocial = req.params.RazonSocial;

  //   await pool.query(
  //     'SELECT * FROM Auxiliar WHERE RazonSocial = ?',
  //     [razonSocial],
  //     function (err, datos, fields) {
  //       if (err) {
  //         return res.status(500).json({
  //           ok: false,
  //           mensaje: 'Error en la Base de Datos cargando Auxiliares',
  //           errors: err,
  //         });
  //       }

  //       return res.status(200).json({
  //         ok: true,
  //         Auxiliar: datos,
  //       });
  //     }
  //   );
  // }

  // // ==========================================
  // // Obtener todos los Auxiliares
  // // ==========================================
  // public async ListaAuxiliares(req: Request, res: Response) {
  //   await pool.query(
  //     'SELECT * FROM Auxiliar',

  //     function (err, dato, fields) {
  //       if (err) {
  //         return res.status(500).json({
  //           ok: false,
  //           mensaje: 'Error en la Base de Datos cargando Auxiliares',
  //           errors: err,
  //         });
  //       }

  //       return res.status(200).json({
  //         ok: true,
  //         auxiliares: dato,
  //       });
  //     }
  //   );
  // }

  // ==========================================
  // Crear OtroGasto
  // ==========================================
  public async GuardarOtroGasto(req: Request, res: Response) {
    var otroGasto = new OtroGastoModel();
    var body = req.body;

    otroGasto.Id_OtroGasto = null;
    otroGasto.Descripcion = body.Descripcion;
    otroGasto.Total = body.Total;
    otroGasto.Diario = body.Diario;
    otroGasto.Id_Empresa = body.Id_Empresa;

    await pool.query('INSERT INTO OtroGasto set ?', otroGasto, (err, datos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al crear OtroGasto',
          errors: err,
        });
      }

      otroGasto.Id_OtroGasto = datos.insertId;

      res.status(201).json({
        ok: true,
        OtroGasto: otroGasto,
        Info: datos,
      });
    });
  }

  // ==========================================
  // Actualizar Otro Gasto
  // ==========================================
  public async ActualizarOtroGasto(req: Request, res: Response) {
    const id = req.params.id;

    var otroGasto = new OtroGastoModel();
    var body = req.body;

    otroGasto.Id_OtroGasto = id;
    otroGasto.Descripcion = body.Descripcion;
    otroGasto.Total = body.Total;
    otroGasto.Diario = body.Diario;
    otroGasto.Id_Empresa = body.Id_Empresa;

    await pool.query(
      'UPDATE OtroGasto set ? WHERE Id_OtroGasto = ?',
      [otroGasto, id],
      (err, auxiliarGuardado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear Auxiliar',
            errors: err,
          });
        }

        res.status(201).json({
          ok: true,
          OtroGasto: otroGasto,
          Info: auxiliarGuardado,
        });
      }
    );
  }

  // ============================================
  //   Borrar un OtroGasto por el id
  // ============================================
  public async EliminarOtroGasto(req: Request, res: Response) {
    const id = req.params.id;

    await pool.query(
      'DELETE FROM OtroGasto WHERE Id_OtroGasto=?',
      [id],

      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al borrar Auxiliar',
            errors: err,
          });
        }

        if (!datos) {
          return res.status(400).json({
            ok: false,
            mensaje: 'No existe un Auxiliar con ese id',
            errors: { message: 'No existe un Auxiliar con ese id' },
          });
        }

        res.status(200).json({
          ok: true,
          OtroGasto: datos,
        });
      }
    );
  }
}

const otroGastoController = new OtroGastoController();
export default otroGastoController;
