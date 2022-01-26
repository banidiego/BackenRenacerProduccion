import { Request, Response } from 'express';

import pool from '../database';
import { ManoObraModel } from '../models/ManoObra.model';

class ManoObraController {
  // ==========================================
  // Obtener Lista de ManoObra por Id_Empresa
  // ==========================================
  public async ListaManoObraId_Empresa(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT * FROM ManoObra where Id_Empresa=?',
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
          ManoObra: datos,
        });
      }
    );
  }

  // ==========================================
  // Obtener Suma Mano de Obra
  // ==========================================
  public async SumaManoObraId_Empresa(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT sum(Salario) as Salario FROM ManoObra where Id_Empresa=?',
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
  // Crear un nuevo Mano Obra
  // ==========================================
  public async GuardarManoObra(req: Request, res: Response) {
    var manoObra = new ManoObraModel();
    var body = req.body;

    manoObra.Id_ManoObra = null;
    manoObra.ApellidosNombres = body.ApellidosNombres;
    manoObra.Salario = body.Salario;
    manoObra.DiasLaborales = body.DiasLaborales;
    manoObra.HorasDiarias = body.HorasDiarias;
    manoObra.Id_Empresa = body.Id_Empresa;

    await pool.query('INSERT INTO ManoObra set ?', manoObra, (err, datos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al crear Auxiliar',
          errors: err,
        });
      }

      manoObra.Id_ManoObra = datos.insertId;

      res.status(201).json({
        ok: true,
        ManoObra: manoObra,
      });
    });
  }

  // ==========================================
  // Actualizar Mano Obra
  // ==========================================
  public async ActualizarManoObra(req: Request, res: Response) {
    const id = req.params.id;

    var manoObra = new ManoObraModel();
    var body = req.body;

    manoObra.Id_ManoObra = id;
    manoObra.ApellidosNombres = body.ApellidosNombres;
    manoObra.Salario = body.Salario;
    manoObra.DiasLaborales = body.DiasLaborales;
    manoObra.HorasDiarias = body.HorasDiarias;
    manoObra.Id_Empresa = body.Id_Empresa;

    await pool.query(
      'UPDATE ManoObra set ? WHERE Id_ManoObra = ?',
      [manoObra, id],
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear Auxiliar',
            errors: err,
          });
        }

        res.status(201).json({
          ok: true,
          ManoObra: datos,
        });
      }
    );
  }

  // ============================================
  //   Borrar un Mano Obra por el id
  // ============================================
  public async EliminarManoObra(req: Request, res: Response) {
    const id = req.params.id;

    await pool.query(
      'DELETE FROM ManoObra WHERE Id_ManoObra=?',
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
          ManoObra: datos,
        });
      }
    );
  }
}

const manoObraController = new ManoObraController();
export default manoObraController;
