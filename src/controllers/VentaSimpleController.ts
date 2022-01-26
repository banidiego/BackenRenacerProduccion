import { Request, Response } from 'express';

import pool from '../database';
import { VentaSimpleModel } from '../models/VentaSimple.model';

class VentaSimpleController {
  // ==========================================
  // Obtener Las Ventas Simples del Mes por Mes, Año, Id_Empresa
  // ==========================================
  public async VentasMesAnoIdEmpresa(req: Request, res: Response) {
    const mes = req.params.Mes;
    const ano = req.params.Ano;
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT Fecha, SUM(Monto) as Total FROM `VentaSimple` WHERE Mes=? and Ano=? and Id_Empresa=? GROUP BY DATE(Fecha) ORDER BY Fecha DESC',
      [mes, ano, id_Empresa],
      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error fltrando Venta Simple',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Ventas: datos,
        });
      }
    );
  }

  // =======================================================
  // Listado de Registros por Fecha e Id_Empresa
  // =======================================================
  public async RegistrosFechaIdEmpresa(req: Request, res: Response) {
    const fecha = req.params.Fecha;
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT * FROM VentaSimple WHERE Fecha= ? and Id_Empresa=?',
      [fecha, id_Empresa],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Registros',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Registros: resp,
          Fecha: fecha,
        });
      }
    );
  }

  // =======================================================
  // Suma de Registros por Fecha e Id_Empresa
  // =======================================================
  public async SumaRegistrosFechaIdEmpresa(req: Request, res: Response) {
    const fecha = req.params.Fecha;
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT SUM(Monto) as Total FROM VentaSimple WHERE Fecha= ? and Id_Empresa=?',
      [fecha, id_Empresa],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Registros',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Total: resp[0].Total,
        });
      }
    );
  }

  // =======================================================
  // Ventas del Día según Fecha, Id_Empresa y Bannys o Zendy
  // =======================================================
  public async VentasDiaFechaIdEmpresa(req: Request, res: Response) {
    const fecha = req.params.Fecha;
    const id_Empresa = req.params.Id_Empresa;
    const bannys = req.params.Bannys;

    await pool.query(
      'SELECT SUM(Monto) as Total FROM VentaSimple WHERE Fecha= ? and Id_Empresa=? and Bannys=?',
      [fecha, id_Empresa, bannys],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Registros',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          TotalVentas: resp[0].Total,
        });
      }
    );
  }

  // =======================================================
  // Ventas Mensuales de los últimos 12 meses
  // =======================================================
  public async VentasMensuales(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const bannys = req.params.Bannys;
    await pool.query(
      'Select (left(upper(Mes),3)) as Mes, sum(Monto) as TotalMes from VentaSimple where Bannys=? and Id_Empresa=? and  Fecha > DATE_SUB(now(), INTERVAL 12 MONTH) group by Mes  Order by Fecha',
      [bannys, id_Empresa],

      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Registros',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          VentasMensuales: resp,
        });
      }
    );
  }

  // =======================================================
  // Ventas de los últimos 12 dias
  // =======================================================
  public async VentasDiarias(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const bannys = req.params.Bannys;
    await pool.query(
      'Select  CONCAT(Date_Format(Fecha,"%d"),"-",left(Mes,3)) as Fecha, sum(Monto) as Total,Fecha as FechaNormal from VentaSimple where Bannys=? and Id_Empresa=?  group by Fecha  Order by Ano,FechaNormal LIMIT 12',
      [bannys, id_Empresa],

      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Registros',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          VentasDiarias: resp,
        });
      }
    );
  }

  // =======================================================
  // Ventas diaria de un periodo
  // =======================================================
  public async VentasPeriodo(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const bannys = req.params.Bannys;
    var FechaInicial: Date;
    var FechaFinal: Date;
    var body = req.body;

    FechaInicial = body.FechaInicial;
    FechaFinal = body.FechaFinal;

    await pool.query(
      'SELECT CONCAT(Date_Format(Fecha,"%d"),"-",left(Mes,3)) as Fecha, sum(Monto) as Monto FROM VentaSimple WHERE Fecha BETWEEN ? AND ? and Id_Empresa=? and Bannys=? GROUP BY Fecha ORDER BY Fecha;',
      [FechaInicial, FechaFinal, id_Empresa, bannys],

      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Registros',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          VentasDiarias: resp,
        });
      }
    );
  }

  // ==========================================
  // Guardar Nueva Venta Simple
  // ==========================================
  public async GuardarVentaSimple(req: Request, res: Response) {
    var ventaSimple = new VentaSimpleModel();
    var body = req.body;

    ventaSimple.Id_VentaSimple = null;
    ventaSimple.Descripcion = body.Descripcion;
    ventaSimple.Fecha = body.Fecha;
    ventaSimple.Monto = body.Monto;
    ventaSimple.Mes = body.Mes;
    ventaSimple.Ano = body.Ano;
    ventaSimple.Bannys = body.Bannys;
    ventaSimple.Id_Empresa = body.Id_Empresa;

    await pool.query(
      'INSERT INTO VentaSimple set ?',
      ventaSimple,
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al Guardar Venta Simple',
            errors: err,
          });
        }

        ventaSimple.Id_VentaSimple = datos.insertId;

        res.status(201).json({
          ok: true,
          VentaSimple: ventaSimple,
          Info: datos,
        });
      }
    );
  }

  // ==========================================
  // Actualizar Venta Simple
  // ==========================================
  public async ActualizarVentaSimple(req: Request, res: Response) {
    const id = req.params.id;

    var ventaSimple = new VentaSimpleModel();
    var body = req.body;

    ventaSimple.Id_VentaSimple = id;
    ventaSimple.Descripcion = body.Descripcion;
    ventaSimple.Fecha = body.Fecha;
    ventaSimple.Monto = body.Monto;
    ventaSimple.Mes = body.Mes;
    ventaSimple.Ano = body.Ano;
    ventaSimple.Bannys = body.Bannys;
    ventaSimple.Id_Empresa = body.Id_Empresa;

    await pool.query(
      'UPDATE VentaSimple set ? WHERE Id_VentaSimple = ?',
      [ventaSimple, id],
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al Modificar Venta Simple',
            errors: err,
          });
        }

        res.status(201).json({
          ok: true,
          VentaSimple: ventaSimple,
          Info: datos,
        });
      }
    );
  }

  // ============================================
  //   Borrar Venta Simple por el id
  // ============================================
  public async EliminarVentaSimple(req: Request, res: Response) {
    const id = req.params.id;

    await pool.query(
      'DELETE FROM VentaSimple WHERE Id_VentaSimple=?',
      [id],

      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al Eliminar Venta Simple',
            errors: err,
          });
        }

        if (!datos) {
          return res.status(400).json({
            ok: false,
            mensaje: 'No existe una Venta Simple con ese id',
            errors: { message: 'No existe una Venta Simple con ese id' },
          });
        }

        res.status(200).json({
          ok: true,
          VentaSimple: datos,
          Id: id,
        });
      }
    );
  }
}

const ventaSimpleController = new VentaSimpleController();
export default ventaSimpleController;
