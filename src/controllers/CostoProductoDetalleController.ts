import { Request, Response } from 'express';

import pool from '../database';
import { CostoProductoDetalleModel } from '../models/CostoProductoDetalle.model';

class CostoProductoDetalleController {
  // ==========================================
  //  Lista de CostoProductoDetalle por Id_CostoProducto
  // ==========================================
  public async ListaCostoProductoIdCostoProducto(req: Request, res: Response) {
    const id = req.params.Id_CostoProducto;

    await pool.query(
      'SELECT * FROM CostoProductoDetalle where Id_CostoProducto=?',
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
          CostosProductoDetalle: datos,
        });
      }
    );
  }

  // ==========================================
  // Cargar Tabla de Costo de Producto Detalle (Inner Join MateriaPrima y Categoria)
  // ==========================================
  public async TablaCostoProductoDetalle(req: Request, res: Response) {
    const id_CostoProducto = req.params.Id_CostoProducto;

    await pool.query(
      'SELECT CostoProductoDetalle.Id_CostoProductoDetalle, CostoProductoDetalle.Id_CostoProducto,CostoProductoDetalle.Cantidad,CostoProductoDetalle.Monto, MateriaPrima.Descripcion,MateriaPrima.Unidad,MateriaPrima.ValorConMerma,Categoria.Descripcion as Categoria FROM CostoProductoDetalle INNER JOIN MateriaPrima ON CostoProductoDetalle.Id_MateriaPrima=MateriaPrima.Id_MateriaPrima INNER JOIN Categoria ON MateriaPrima.Id_Categoria = Categoria.Id_Categoria WHERE Id_CostoProducto = ?',
      [id_CostoProducto],
      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error en la Base de Datos cargando Auxiliares',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Tabla: datos,
        });
      }
    );
  }

  // ==========================================
  //  Suma de Lista de CostoProductoDetalle por Id_CostoProducto
  // ==========================================
  public async SumaListaCostoProductoIdCostoProducto(
    req: Request,
    res: Response
  ) {
    const id = req.params.Id_CostoProducto;

    await pool.query(
      'SELECT sum(Monto) as Total FROM CostoProductoDetalle WHERE Id_CostoProducto=?',
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
          Total: datos,
        });
      }
    );
  }

  // ==========================================
  // Obtener CostoProductoDEtalle por Id_CostoProductoDetalle
  // ==========================================
  public async CostoProductoDetalleId(req: Request, res: Response) {
    const id_CostoProductoDetalle = req.params.Id_CostoProductoDetalle;

    await pool.query(
      'select * from CostoProductoDetalle where Id_CostoProductoDetalle=?',
      [id_CostoProductoDetalle],

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
          CostoProductoDetalle: datos,
        });
      }
    );
  }

  // ==========================================
  // Crear un Costoproducto
  // ==========================================
  public async GuardarCostoProductoDetalle(req: Request, res: Response) {
    var costoProductoDetalle = new CostoProductoDetalleModel();
    var body = req.body;

    costoProductoDetalle.Id_CostoProductoDetalle = null;
    costoProductoDetalle.Id_CostoProducto = body.Id_CostoProducto;
    costoProductoDetalle.Id_MateriaPrima = body.Id_MateriaPrima;
    costoProductoDetalle.Cantidad = body.Cantidad;
    costoProductoDetalle.Monto = body.Monto;

    await pool.query(
      'INSERT INTO CostoProductoDetalle set ?',
      costoProductoDetalle,
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear Auxiliar',
            errors: err,
          });
        }

        costoProductoDetalle.Id_CostoProductoDetalle = datos.insertId;

        res.status(201).json({
          ok: true,
          CostoProducto: costoProductoDetalle,
          Info: datos,
        });
      }
    );
  }

  // ==========================================
  // Actualizar CostoProductoDetalle
  // ==========================================
  public async ActualizarCostoProductoDetalle(req: Request, res: Response) {
    const Id_CostoProductoDetalle = parseInt(
      req.params.Id_CostoProductoDetalle
    );

    var costoProductoDetalle = new CostoProductoDetalleModel();
    var body = req.body;

    costoProductoDetalle.Id_CostoProductoDetalle = null;
    costoProductoDetalle.Id_CostoProducto = body.Id_CostoProducto;
    costoProductoDetalle.Id_MateriaPrima = body.Id_MateriaPrima;
    costoProductoDetalle.Cantidad = body.Cantidad;
    costoProductoDetalle.Monto = body.Monto;

    await pool.query(
      'UPDATE CostoProductoDetalle set ? WHERE Id_CostoProductoDetalle = ?',
      [costoProductoDetalle, Id_CostoProductoDetalle],
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear CostoProductoDetalle',
            errors: err,
          });
        }

        res.status(201).json({
          ok: true,
          CostoProductoDetalle: datos,
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

const costoProductoDetalleController = new CostoProductoDetalleController();
export default costoProductoDetalleController;
