import { Request, Response } from 'express';

import pool from '../database';
import { CostoFijoModel } from '../models/CostoFijo.model';

class CostoFijoController {
  // ==========================================
  // Obtener Lista de Categorias por Id_Empresa
  // ==========================================
  public async ObtenerCostoFijoIdEmpresa(req: Request, res: Response) {
    const id = req.params.Id_Empresa;

    await pool.query(
      'SELECT * FROM CostosFijos where Id_Empresa=?',
      [id],
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
          CostosFijos: datos,
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

  // // ==========================================
  // // Crear un nuevo Auxiliar
  // // ==========================================
  // public async GuardarAuxiliar(req: Request, res: Response) {
  //   var auxiliar = new AuxiliarModel();
  //   var body = req.body;

  //   auxiliar.Id_Auxiliar = null;
  //   auxiliar.Id_TipoDocumentoIdentidad = body.Id_TipoDocumentoIdentidad;
  //   auxiliar.RUC = body.RUC;
  //   auxiliar.ApellidoPaterno = body.ApellidoPaterno;
  //   auxiliar.ApellidoMaterno = body.ApellidoMaterno;
  //   auxiliar.Nombres = body.Nombres;
  //   auxiliar.RazonSocial = body.RazonSocial;
  //   auxiliar.Direccion = body.Direccion;
  //   auxiliar.TipoPersona = body.TipoPersona;

  //   await pool.query(
  //     'INSERT INTO Auxiliar set ?',
  //     auxiliar,
  //     (err, auxiliarGuardado) => {
  //       if (err) {
  //         return res.status(400).json({
  //           ok: false,
  //           mensaje: 'Error al crear Auxiliar',
  //           errors: err,
  //         });
  //       }

  //       auxiliar.Id_Auxiliar = auxiliarGuardado.insertId;

  //       res.status(201).json({
  //         ok: true,
  //         auxiliar: auxiliar,
  //         Info: auxiliarGuardado,
  //       });
  //     }
  //   );
  // }

  // ==========================================
  // Actualizar CostosFijos por Id_CostoFijo y Id_Empresa
  // ==========================================
  public async ActualizarCostoFijo(req: Request, res: Response) {
    const Id_CostoFijo = parseInt(req.params.Id_CostoFijo);
    const Id_Empresa = parseInt(req.params.Id_Empresa);

    var costoFijo = new CostoFijoModel();
    var body = req.body;

    costoFijo.Id_CostoFijo = Id_CostoFijo;
    costoFijo.DiasLaborables = body.DiasLaborables;
    costoFijo.ManoObraTotal = body.ManoObraTotal;
    costoFijo.ManoObraDiario = body.ManoObraDiario;
    costoFijo.ManoObraHora = body.ManoObraHora;
    costoFijo.ManoObraMinuto = body.ManoObraMinuto;
    costoFijo.AlquilerTotal = body.AlquilerTotal;
    costoFijo.AlquilerDiario = body.AlquilerDiario;
    costoFijo.LuzElectricaTotal = body.LuzElectricaTotal;
    costoFijo.LuzElectricaDiario = body.LuzElectricaDiario;
    costoFijo.AguaTotal = body.AguaTotal;
    costoFijo.AguaDiario = body.AguaDiario;
    costoFijo.ProductosVendidosMes = body.ProductosVendidosMes;
    costoFijo.OtrosGastosTotal = body.OtrosGastosTotal;
    costoFijo.OtrosGastosDiario = body.OtrosGastosDiario;
    costoFijo.Id_Empresa = Id_Empresa;

    await pool.query(
      'UPDATE CostosFijos set ? WHERE Id_CostoFijo = ? and Id_Empresa=?',
      [costoFijo, Id_CostoFijo, Id_Empresa],
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
          CostoFijo: datos,
        });
      }
    );
  }

  // // ============================================
  // //   Borrar un Auxiliar por el id
  // // ============================================
  // public async EliminarAuxiliar(req: Request, res: Response) {
  //   const id = req.params.id;

  //   await pool.query(
  //     'DELETE FROM Auxiliar WHERE Id_Auxiliar=?',
  //     [id],

  //     function (err, auxiliarBorrado, fields) {
  //       if (err) {
  //         return res.status(500).json({
  //           ok: false,
  //           mensaje: 'Error al borrar Auxiliar',
  //           errors: err,
  //         });
  //       }

  //       if (!auxiliarBorrado) {
  //         return res.status(400).json({
  //           ok: false,
  //           mensaje: 'No existe un Auxiliar con ese id',
  //           errors: { message: 'No existe un Auxiliar con ese id' },
  //         });
  //       }

  //       res.status(200).json({
  //         ok: true,
  //         auxiliar: auxiliarBorrado,
  //       });
  //     }
  //   );
  // }
}

const costoFijoController = new CostoFijoController();
export default costoFijoController;
