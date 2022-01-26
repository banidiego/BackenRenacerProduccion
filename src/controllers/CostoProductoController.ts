import { Request, Response } from 'express';

import pool from '../database';
import { CostoProductoModel } from '../models/CostoProducto.model';

class CostoProductoController {
  // ==========================================
  // Obtener Lista de CostoProducto por Id_Empresa
  // ==========================================
  public async ListaCostoProductoIdEmpresa(req: Request, res: Response) {
    const id = req.params.Id_Empresa;

    await pool.query(
      'SELECT * FROM CostoProducto where Id_Empresa=?',
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
          CostoProductos: datos,
        });
      }
    );
  }

  // ==========================================
  // Obtener CostoProducto por Id_CostoProducto y Id_Empresa
  // ==========================================
  public async ObtenerCostoProductoIdCostoIdEmpresa(
    req: Request,
    res: Response
  ) {
    const id_CostoProducto = req.params.Id_CostoProducto;
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT * FROM CostoProducto where Id_CostoProducto=? and Id_Empresa=?',
      [id_CostoProducto, id_Empresa],
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
          CostoProducto: datos,
        });
      }
    );
  }

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
  // Crear un Costoproducto
  // ==========================================
  public async GuardarCostoProducto(req: Request, res: Response) {
    var costoProducto = new CostoProductoModel();
    var body = req.body;

    costoProducto.Id_CostoProducto = null;
    costoProducto.Descripcion = body.Descripcion;
    costoProducto.MinutosProduccion = body.MinutosProduccion;
    costoProducto.UnidadesProducidas = body.UnidadesProducidas;
    costoProducto.TotalCostosFijos = body.TotalCostosFijos;
    costoProducto.TotalCostoVariable = body.TotalCostoVariable;
    costoProducto.TiempoTotal = body.TiempoTotal;
    costoProducto.PrecioUnitarioVenta = body.PrecioUnitarioVenta;
    costoProducto.Id_Empresa = body.Id_Empresa;

    await pool.query(
      'INSERT INTO CostoProducto set ?',
      costoProducto,
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear Auxiliar',
            errors: err,
          });
        }

        costoProducto.Id_CostoProducto = datos.insertId;

        res.status(201).json({
          ok: true,
          CostoProducto: costoProducto,
          Info: datos,
        });
      }
    );
  }

  // ==========================================
  // Actualizar CostosFijos por Id_CostoFijo y Id_Empresa
  // ==========================================
  public async ActualizarCostoFijo(req: Request, res: Response) {
    const Id_CostoFijo = parseInt(req.params.Id_CostoFijo);
    const Id_Empresa = parseInt(req.params.Id_Empresa);

    var costoFijo = new CostoProductoModel();
    var body = req.body;

    // costoFijo.Id_CostoFijo = Id_CostoFijo;
    // costoFijo.DiasLaborables = body.DiasLaborables;
    // costoFijo.ManoObraTotal = body.ManoObraTotal;
    // costoFijo.ManoObraDiario = body.ManoObraDiario;
    // costoFijo.ManoObraHora = body.ManoObraHora;
    // costoFijo.ManoObraMinuto = body.ManoObraMinuto;
    // costoFijo.AlquilerTotal = body.AlquilerTotal;
    // costoFijo.AlquilerDiario = body.AlquilerDiario;
    // costoFijo.LuzElectricaTotal = body.LuzElectricaTotal;
    // costoFijo.LuzElectricaDiario = body.LuzElectricaDiario;
    // costoFijo.AguaTotal = body.AguaTotal;
    // costoFijo.AguaDiario = body.AguaDiario;
    // costoFijo.ProductosVendidosMes = body.ProductosVendidosMes;
    // costoFijo.OtrosGastosTotal = body.OtrosGastosTotal;
    // costoFijo.OtrosGastosDiario = body.OtrosGastosDiario;
    // costoFijo.Id_Empresa = Id_Empresa;

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

const costoProductoController = new CostoProductoController();
export default costoProductoController;
