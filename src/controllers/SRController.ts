import { Request, Response } from 'express';

import pool from '../database';
import { SRModel } from '../models/SR.model';

class SRController {
  // ==========================================
  // Obtener Soliitudes Mensuales por Año, Mes y Código de Proyecto para Tabla de Movimiento Diario (Año y Origen (Codigo_Proyecto))
  // ==========================================
  public async ListaAnoMesIdProyecto(req: Request, res: Response) {
    const ano = parseInt(req.params.Ano);
    const mes = req.params.Mes;
    const id_Proyecto = req.params.Id_Proyecto;

    await pool.query(
      'SELECT * FROM SR WHERE Ano = ? and Mes = ? and Id_Proyecto = ?',
      [ano, mes, id_Proyecto],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando constiables de Sesión',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Solicitudes: resp,
        });
      }
    );
  }

  // ==========================================
  // Obtener Número de Solicitud (Maximo por Codigo_Proyecto y por Año)
  // ==========================================
  public async MaximoNumeroSolicitud(req: Request, res: Response) {
    const ano = parseInt(req.params.Ano);
    const id_Proyecto = req.params.Id_Proyecto;

    await pool.query(
      'SELECT MAX(Numero) as Maximo FROM SR WHERE Ano = ? and Id_Proyecto = ?',
      [ano, id_Proyecto],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Lista de Origenes',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Numero: resp,
        });
      }
    );
  }

  // ==========================================
  // Obtener SR a partir de Id_SR
  // ==========================================
  public async ListaIdSR(req: Request, res: Response) {
    const id_SR = req.params.Id_SR;

    await pool.query(
      'SELECT * FROM SR WHERE Id_SR = ? ',
      [id_SR],
      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando OperaciónPrincipal',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          SR: datos,
        });
      }
    );
  }

  // ==========================================
  // Crear SR
  // ==========================================
  public async GuardarSR(req: Request, res: Response) {
    const sr = new SRModel();
    const body = req.body;

    sr.Id_SR = null;
    sr.Numero = body.Numero;
    sr.Serie = body.Serie;
    sr.Responsable = body.Responsable;
    sr.RUCResponsable = body.RUCResponsable;
    sr.FechaSolicitud = body.FechaSolicitud;
    sr.EntidadCooperante = body.EntidadCooperante;
    sr.Cheque = body.Cheque;
    sr.MonedaCheque = body.MonedaCheque;
    sr.ImporteCheque = body.ImporteCheque;
    sr.TCCheque = body.TCCheque;
    sr.Descripcion = body.Descripcion;
    sr.FechaRendicion = body.FechaRendicion;
    sr.Observaciones = body.Observaciones;
    sr.Presupuesto = body.Presupuesto;
    sr.NRI = body.NRI;
    sr.MontoRI = body.MontoRI;
    sr.NCC = body.NCC;
    sr.MontoCC = body.MontoCC;
    sr.TotalGasto = body.TotalGasto;
    sr.Id_Verificacion = body.Id_Verificacion;
    sr.Tipo = body.Tipo;
    sr.Bloqueado = body.Bloqueado;
    sr.Rendido = body.Rendido;
    sr.Rubro = body.Rubro;
    sr.Mes = body.Mes;
    sr.Ano = body.Ano;
    sr.Id_Proyecto = body.Id_Proyecto;

    await pool.query('INSERT INTO SR set ?', sr, (err, datos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al crear Operación',
          errors: err,
        });
      }

      sr.Id_SR = datos.insertId;

      res.status(201).json({
        ok: true,
        SR: sr,
        Todo: body,
      });
    });
  }

  // ==========================================
  // Actualizar SR
  // ==========================================
  public async ActualizarSR(req: Request, res: Response) {
    const id = req.params.id;

    const sr = new SRModel();
    const body = req.body;

    sr.Id_SR = id;
    sr.Numero = body.Numero;
    sr.Serie = body.Serie;
    sr.Responsable = body.Responsable;
    sr.RUCResponsable = body.RUCResponsable;
    sr.FechaSolicitud = body.FechaSolicitud;
    sr.EntidadCooperante = body.EntidadCooperante;
    sr.Cheque = body.Cheque;
    sr.MonedaCheque = body.MonedaCheque;
    sr.ImporteCheque = body.ImporteCheque;
    sr.TCCheque = body.TCCheque;
    sr.Descripcion = body.Descripcion;
    sr.FechaRendicion = body.FechaRendicion;
    sr.Observaciones = body.Observaciones;
    sr.Presupuesto = body.Presupuesto;
    sr.NRI = body.NRI;
    sr.MontoRI = body.MontoRI;
    sr.NCC = body.NCC;
    sr.MontoCC = body.MontoCC;
    sr.TotalGasto = body.TotalGasto;
    sr.Id_Verificacion = body.Id_Verificacion;
    sr.Tipo = body.Tipo;
    sr.Bloqueado = body.Bloqueado;
    sr.Rendido = body.Rendido;
    sr.Rubro = body.Rubro;
    sr.Mes = body.Mes;
    sr.Ano = body.Ano;
    sr.Id_Proyecto = body.Id_Proyecto;

    await pool.query(
      'UPDATE SR set ? WHERE Id_SR = ?',
      [sr, id],
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al Actualizar Operación',
            errors: err,
          });
        }

        res.status(201).json({
          ok: true,
          SR: sr,
        });
      }
    );
  }
}

const sRController = new SRController();
export default sRController;
