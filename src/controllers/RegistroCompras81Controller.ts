import { Request, Response } from 'express';

import pool from '../database';
// import * as json2csv  from 'json2csv';
const CsvParser = require('json2csv').Parser;
import { RegistroCompras81Model } from '../models/RegistroCompras81.model';

class RegistroCompras81Controller {
  // ==========================================
  // Obtener ültimo Número Correlativo del Mes
  // ==========================================
  public async UltimoCorrelativo(req: Request, res: Response) {
    const ano = req.params.Ano;
    const mes = req.params.Mes;
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT MAX(CUO) AS Maximo FROM RegistroCompras81 WHERE Ano= ? and Mes=? and Id_Empresa=?',
      [ano, mes, id_Empresa],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Tabla',
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

  // =======================================================
  // Listado de Registros por Fecha e Id_Empresa
  // =======================================================
  public async RegistrosFechaIdEmpresa(req: Request, res: Response) {
    const fecha = req.params.Fecha;
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT * FROM RegistroCompras81 WHERE FechaEmision= ? and Id_Empresa=?',
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
      'SELECT SUM(ImporteTotal) as Total FROM RegistroCompras81 WHERE FechaEmision= ? and Id_Empresa=?',
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
  // Listado de Registros por Dia, Mes, Año y Id_Empresa
  // =======================================================
  public async ListadoDiarioMesAnoIdEmpresa(req: Request, res: Response) {
    const mes = req.params.Mes;
    const ano = req.params.Ano;
    const id_Empresa = req.params.Id_Empresa;

    await pool.query(
      'SELECT FechaEmision, SUM(ImporteTotal) as Total FROM `RegistroCompras81`WHERE Mes=? and Ano=? and Id_Empresa=? GROUP BY DATE(FechaEmision) ORDER BY FechaEmision DESC',
      [mes, ano, id_Empresa],
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
          Reporte: resp,
          Fecha: resp,
        });
      }
    );
  }

  // =======================================================
  // Cargar Registro por Id_Registro
  // =======================================================
  public async RegistroIdRegistro(req: Request, res: Response) {
    const id_Registro = parseInt(req.params.Id_Registro);

    await pool.query(
      'SELECT * from RegistroCompras81 WHERE Id_RegistroCompras81= ?',
      [id_Registro],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Registro',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Registro: resp,
        });
      }
    );
  }

  // =======================================================
  // Gastos del Mensuales de los últimos 12 meses
  // =======================================================
  public async GastosMensuales(req: Request, res: Response) {
    const bannys = req.params.Bannys;
    await pool.query(
      'Select (left(upper(Mes),3)) as Mes, sum(ImporteTotal) as TotalMes from RegistroCompras81 where Bannys=? and  FechaEmision > DATE_SUB(now(), INTERVAL 12 MONTH) group by Mes  Order by FechaEmision',
      [bannys],

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
          GastosMensuales: resp,
        });
      }
    );
  }

  // =======================================================
  // Gastos de los últimos 12 dias
  // =======================================================
  public async GastosDiarios(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const bannys = req.params.Bannys;
    await pool.query(
      'Select  CONCAT(Date_Format(FechaEmision,"%d"),"-",left(Mes,3)) as Fecha, sum(ImporteTotal) as Total from RegistroCompras81 where Bannys=? and Id_Empresa=?  group by FechaEmision  Order by FechaEmision LIMIT 12',
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
          GastosDiarios: resp,
        });
      }
    );
  }

  // =======================================================
  // Reporte de Registro de Gasto 8.1 en Pantalla
  // =======================================================
  public async ReporteGasto81(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const mes = req.params.Mes;
    const ano = req.params.Ano;
    await pool.query(
      'SELECT Id_RegistroCompras81, Periodo, CUO, CUO_Alfanumerico, FechaEmision, FechaVencimiento, TipoComprobante, Serie, AnoDUA, NumeroComprobante, ComprobantesAgrupados, TipoDocumentoIdentidad, RUCProveedor, RazonSocial,C1,C2,C3,C4,C5,C6,C7,C8,C9, ImporteTotal, CodigoMoneda, TipoCambio, NCFechaEmision, NCTipoComprobante,NCSerie,NCCodigoDependencia,NCNumeroComprobante, DefraccionFechaEmision,DefraccionNumeroConstancia, DefraccionNumeroComprobante, ClasificacionBienes,IdentificacionContrato,ErrorTipo1,ErrorTipo2,ErrorTipo3,ErrorTipo4, CanceladoBancarizado, EstadoOperacion FROM RegistroCompras81 WHERE Id_Empresa=? and Mes=? and Ano=? and TipoCompra<>5 ORDER BY CUO',
      [id_Empresa, mes, ano],

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
          Reporte: resp,
        });
      }
    );
  }

  // =======================================================
  // Prubea de Descargar de Archivo CSV
  // =======================================================
  public DescargarReporte(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const mes = req.params.Mes;
    const ano = req.params.Ano;

    pool.query(
      `SELECT Periodo,CUO,CUO_Alfanumerico,DATE_FORMAT(FechaEmision,'%d/%m/%Y') as FechaEmision,DATE_FORMAT(FechaVencimiento,'%d/%m/%Y') as FechaVencimiento,TipoComprobante,Serie,AnoDUA,NumeroComprobante,ComprobantesAgrupados,TipoDocumentoIdentidad,RUCProveedor,RazonSocial,IF(C1>0,C1,"") as C1,IF(C2>0,C2,"") as C2,IF(C3>0,C3,"") as C3,IF(C4>0,C4,"") as C4,IF(C5>0,C5,"") as C5,IF(C6>0,C6,"") as C6,IF(C7>0,C7,"") as C7,IF(C8>0,C8,"") as C8,IF(C9>0,C9,"") as C9,ImporteTotal,CodigoMoneda,TipoCambio,DATE_FORMAT(NCFechaEmision,'%d/%m/%Y') as NCFechaEmision,NCTipoComprobante,NCSerie,NCCodigoDependencia,NCNumeroComprobante,DATE_FORMAT(DefraccionFechaEmision,'%d/%m/%Y') as DefraccionFechaEmision,DefraccionNumeroConstancia,DefraccionNumeroComprobante,ClasificacionBienes,IdentificacionContrato,ErrorTipo1,ErrorTipo2,ErrorTipo3,ErrorTipo4,CanceladoBancarizado,EstadoOperacion,Bannys="" FROM RegistroCompras81 WHERE Id_Empresa=? and Ano=? and Mes=? and TipoCompra<>5`,
      [id_Empresa, ano, mes],
      function (err, resp, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando Registros',
            errors: err,
          });
        }

        let NombreArchivo: string;
        let Periodo: string;
        let MesNumero;
        if (mes === 'Enero') {
          MesNumero = '01';
        } else if (mes === 'Febrero') {
          MesNumero = '02';
        } else if (mes === 'Marzo') {
          MesNumero = '03';
        } else if (mes === 'Abril') {
          MesNumero = '04';
        } else if (mes === 'Mayo') {
          MesNumero = '05';
        } else if (mes === 'Junio') {
          MesNumero = '06';
        } else if (mes === 'Julio') {
          MesNumero = '07';
        } else if (mes === 'Agosto') {
          MesNumero = '08';
        } else if (mes === 'Septiembre') {
          MesNumero = '09';
        } else if (mes === 'Octubre') {
          MesNumero = '10';
        } else if (mes === 'Noviembre') {
          MesNumero = '11';
        } else if (mes === 'Diciembre') {
          MesNumero = '12';
        }

        Periodo = ano.toString() + MesNumero + '00';

        let tutorials: {
          Periodo: string;
          CUO: string;
          CUO_Alfanumerico: string;
          FechaEmision: Date;
          FechaVencimiento: Date;
          TipoComprobante: string;
          Serie: string;
          AnoDUA: string;
          NumeroComprobante: string;
          ComprobantesAgrupados: string;
          TipoDocumentoIdentidad: string;
          RUCProveedor: string;
          RazonSocial: string;
          C1: number;
          C2: number;
          C3: number;
          C4: number;
          C5: number;
          C6: number;
          C7: number;
          C8: number;
          C9: number;
          ImporteTotal: number;
          CodigoMoneda: string;
          TipoCambio: number;
          NCFechaEmision: Date;
          NCTipoComprobante: string;
          NCSerie: string;
          NCCodigoDependencia: string;
          NCNumeroComprobante: string;
          DefraccionFechaEmision: Date;
          DefraccionNumeroConstancia: string;
          DefraccionNumeroComprobante: string;
          ClasificacionBienes: string;
          IdentificacionContrato: string;
          ErrorTipo1: string;
          ErrorTipo2: string;
          ErrorTipo3: string;
          ErrorTipo4: string;
          CanceladoBancarizado: boolean;
          EstadoOperacion: string;
          TipoCompra: string;
        }[] = [];

        resp.forEach(
          (obj: {
            Periodo: string;
            CUO: string;
            CUO_Alfanumerico: string;
            FechaEmision: Date;
            FechaVencimiento: Date;
            TipoComprobante: string;
            Serie: string;
            AnoDUA: string;
            NumeroComprobante: string;
            ComprobantesAgrupados: string;
            TipoDocumentoIdentidad: string;
            RUCProveedor: string;
            RazonSocial: string;
            C1: number;
            C2: number;
            C3: number;
            C4: number;
            C5: number;
            C6: number;
            C7: number;
            C8: number;
            C9: number;
            ImporteTotal: number;
            CodigoMoneda: string;
            TipoCambio: number;
            NCFechaEmision: Date;
            NCTipoComprobante: string;
            NCSerie: string;
            NCCodigoDependencia: string;
            NCNumeroComprobante: string;
            DefraccionFechaEmision: Date;
            DefraccionNumeroConstancia: string;
            DefraccionNumeroComprobante: string;
            ClasificacionBienes: string;
            IdentificacionContrato: string;
            ErrorTipo1: string;
            ErrorTipo2: string;
            ErrorTipo3: string;
            ErrorTipo4: string;
            CanceladoBancarizado: boolean;
            EstadoOperacion: string;
            TipoCompra: string;
          }) => {
            const {
              Periodo,
              CUO,
              CUO_Alfanumerico,
              FechaEmision,
              FechaVencimiento,
              TipoComprobante,
              Serie,
              AnoDUA,
              NumeroComprobante,
              ComprobantesAgrupados,
              TipoDocumentoIdentidad,
              RUCProveedor,
              RazonSocial,
              C1,
              C2,
              C3,
              C4,
              C5,
              C6,
              C7,
              C8,
              C9,
              ImporteTotal,
              CodigoMoneda,
              TipoCambio,
              NCFechaEmision,
              NCTipoComprobante,
              NCSerie,
              NCCodigoDependencia,
              NCNumeroComprobante,
              DefraccionFechaEmision,
              DefraccionNumeroConstancia,
              DefraccionNumeroComprobante,
              ClasificacionBienes,
              IdentificacionContrato,
              ErrorTipo1,
              ErrorTipo2,
              ErrorTipo3,
              ErrorTipo4,
              CanceladoBancarizado,
              EstadoOperacion,
              TipoCompra,
            } = obj;
            tutorials.push({
              Periodo,
              CUO,
              CUO_Alfanumerico,
              FechaEmision,
              FechaVencimiento,
              TipoComprobante,
              Serie,
              AnoDUA,
              NumeroComprobante,
              ComprobantesAgrupados,
              TipoDocumentoIdentidad,
              RUCProveedor,
              RazonSocial,
              C1,
              C2,
              C3,
              C4,
              C5,
              C6,
              C7,
              C8,
              C9,
              ImporteTotal,
              CodigoMoneda,
              TipoCambio,
              NCFechaEmision,
              NCTipoComprobante,
              NCSerie,
              NCCodigoDependencia,
              NCNumeroComprobante,
              DefraccionFechaEmision,
              DefraccionNumeroConstancia,
              DefraccionNumeroComprobante,
              ClasificacionBienes,
              IdentificacionContrato,
              ErrorTipo1,
              ErrorTipo2,
              ErrorTipo3,
              ErrorTipo4,
              CanceladoBancarizado,
              EstadoOperacion,
              TipoCompra,
            });
          }
        );

        const csvFields = ['Id', 'Periodo', 'RUCProveedores', 'RazonSocial'];
        const csvParser = new CsvParser({
          delimiter: '|',
          quote: '',
          header: false,
        });
        const csvData = csvParser.parse(tutorials);

        NombreArchivo = 'LE10224252949' + Periodo + '080100001111';

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${NombreArchivo}.txt`
        );

        res.status(200).end(csvData);

        // return res.status(200).json({
        //   ok: true,
        //   Reporte: csvData,
        // });
      }
    );
  }

  // =======================================================
  // Compras diarias de un periodo
  // =======================================================
  public async ComprasPeriodo(req: Request, res: Response) {
    const id_Empresa = req.params.Id_Empresa;
    const bannys = req.params.Bannys;
    var FechaInicial: Date;
    var FechaFinal: Date;
    var body = req.body;

    FechaInicial = body.FechaInicial;
    FechaFinal = body.FechaFinal;

    await pool.query(
      'SELECT CONCAT(Date_Format(FechaEmision,"%d"),"-",left(Mes,3)) as Fecha, sum(ImporteTotal) as Monto FROM RegistroCompras81 WHERE FechaEmision BETWEEN ? AND ? and Id_Empresa=? and Bannys=? GROUP BY FechaEmision ORDER BY FechaEmision;',
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
          ComprasDiarias: resp,
        });
      }
    );
  }

  // ==========================================
  // Guardar Registro Compra
  // ==========================================
  public async GuardarRegistroCompra(req: Request, res: Response) {
    var registroCompra = new RegistroCompras81Model();
    var body = req.body;

    registroCompra.Id_RegistroCompras81 = null;
    registroCompra.Periodo = body.Periodo;
    registroCompra.CUO = body.CUO;
    registroCompra.CUO_Alfanumerico = body.CUO_Alfanumerico;
    registroCompra.FechaEmision = body.FechaEmision;
    registroCompra.FechaVencimiento = body.FechaVencimiento;
    registroCompra.TipoComprobante = body.TipoComprobante;
    registroCompra.Serie = body.Serie;
    registroCompra.AnoDUA = body.AnoDUA;
    registroCompra.NumeroComprobante = body.NumeroComprobante;
    registroCompra.ComprobantesAgrupados = body.ComprobantesAgrupados;
    registroCompra.TipoDocumentoIdentidad = body.TipoDocumentoIdentidad;
    registroCompra.RUCProveedor = body.RUCProveedor;
    registroCompra.RazonSocial = body.RazonSocial;
    registroCompra.C1 = body.C1;
    registroCompra.C2 = body.C2;
    registroCompra.C3 = body.C3;
    registroCompra.C4 = body.C4;
    registroCompra.C5 = body.C5;
    registroCompra.C6 = body.C6;
    registroCompra.C7 = body.C7;
    registroCompra.C8 = body.C8;
    registroCompra.C9 = body.C9;
    registroCompra.C10 = body.C10;
    registroCompra.ImporteTotal = body.ImporteTotal;
    registroCompra.CodigoMoneda = body.CodigoMoneda;
    registroCompra.TipoCambio = body.TipoCambio;
    registroCompra.NCFechaEmision = body.NCFechaEmision;
    registroCompra.NCTipoComprobante = body.NCTipoComprobante;
    registroCompra.NCSerie = body.NCSerie;
    registroCompra.NCCodigoDependencia = body.NCCodigoDependencia;
    registroCompra.NCNumeroComprobante = body.NCNumeroComprobante;
    registroCompra.DefraccionFechaEmision = body.DefraccionFechaEmision;
    registroCompra.DefraccionNumeroConstancia = body.DefraccionNumeroConstancia;
    registroCompra.DefraccionNumeroComprobante =
      body.DefraccionNumeroComprobante;
    registroCompra.ClasificacionBienes = body.ClasificacionBienes;
    registroCompra.IdentificacionContrato = body.IdentificacionContrato;
    registroCompra.ErrorTipo1 = body.ErrorTipo1;
    registroCompra.ErrorTipo2 = body.ErrorTipo2;
    registroCompra.ErrorTipo3 = body.ErrorTipo3;
    registroCompra.ErrorTipo4 = body.ErrorTipo4;
    registroCompra.CanceladoBancarizado = body.CanceladoBancarizado;
    registroCompra.EstadoOperacion = body.EstadoOperacion;
    registroCompra.TipoCompra = body.TipoCompra;
    registroCompra.Mes = body.Mes;
    registroCompra.Ano = body.Ano;
    registroCompra.Bannys = body.Bannys;
    registroCompra.Id_Empresa = body.Id_Empresa;

    await pool.query(
      'INSERT INTO RegistroCompras81 set ?',
      registroCompra,
      (err, resp) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear Registro de Compra',
            errors: err,
          });
        }

        registroCompra.Id_RegistroCompras81 = resp.insertId;

        res.status(201).json({
          ok: true,
          RegistroCompra: registroCompra,
        });
      }
    );
  }

  // ==========================================
  // Actualizar Registro Compra
  // ==========================================
  public async ActualizarRegistroCompra(req: Request, res: Response) {
    const id = req.params.id;

    const registroCompra = new RegistroCompras81Model();
    const body = req.body;

    registroCompra.Id_RegistroCompras81 = id;
    registroCompra.Periodo = body.Periodo;
    registroCompra.CUO = body.CUO;
    registroCompra.CUO_Alfanumerico = body.CUO_Alfanumerico;
    registroCompra.FechaEmision = body.FechaEmision;
    registroCompra.FechaVencimiento = body.FechaVencimiento;
    registroCompra.TipoComprobante = body.TipoComprobante;
    registroCompra.Serie = body.Serie;
    registroCompra.AnoDUA = body.AnoDUA;
    registroCompra.NumeroComprobante = body.NumeroComprobante;
    registroCompra.ComprobantesAgrupados = body.ComprobantesAgrupados;
    registroCompra.TipoDocumentoIdentidad = body.TipoDocumentoIdentidad;
    registroCompra.RUCProveedor = body.RUCProveedor;
    registroCompra.RazonSocial = body.RazonSocial;
    registroCompra.C1 = body.C1;
    registroCompra.C2 = body.C2;
    registroCompra.C3 = body.C3;
    registroCompra.C4 = body.C4;
    registroCompra.C5 = body.C5;
    registroCompra.C6 = body.C6;
    registroCompra.C7 = body.C7;
    registroCompra.C8 = body.C8;
    registroCompra.C9 = body.C9;
    registroCompra.C10 = body.C10;
    registroCompra.ImporteTotal = body.ImporteTotal;
    registroCompra.CodigoMoneda = body.CodigoMoneda;
    registroCompra.TipoCambio = body.TipoCambio;
    registroCompra.NCFechaEmision = body.NCFechaEmision;
    registroCompra.NCTipoComprobante = body.NCTipoComprobante;
    registroCompra.NCSerie = body.NCSerie;
    registroCompra.NCCodigoDependencia = body.NCCodigoDependencia;
    registroCompra.NCNumeroComprobante = body.NCNumeroComprobante;
    registroCompra.DefraccionFechaEmision = body.DefraccionFechaEmision;
    registroCompra.DefraccionNumeroConstancia = body.DefraccionNumeroConstancia;
    registroCompra.DefraccionNumeroComprobante =
      body.DefraccionNumeroComprobante;
    registroCompra.ClasificacionBienes = body.ClasificacionBienes;
    registroCompra.IdentificacionContrato = body.IdentificacionContrato;
    registroCompra.ErrorTipo1 = body.ErrorTipo1;
    registroCompra.ErrorTipo2 = body.ErrorTipo2;
    registroCompra.ErrorTipo3 = body.ErrorTipo3;
    registroCompra.ErrorTipo4 = body.ErrorTipo4;
    registroCompra.CanceladoBancarizado = body.CanceladoBancarizado;
    registroCompra.EstadoOperacion = body.EstadoOperacion;
    registroCompra.TipoCompra = body.TipoCompra;
    registroCompra.Mes = body.Mes;
    registroCompra.Ano = body.Ano;
    registroCompra.Bannys = body.Bannys;
    registroCompra.Id_Empresa = body.Id_Empresa;

    await pool.query(
      'UPDATE RegistroCompras81 set ? WHERE Id_RegistroCompras81 = ?',
      [registroCompra, id],
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al Actualizar Registro de Compra',
            errors: err,
          });
        }

        res.status(201).json({
          ok: true,
          RegistroCompra: registroCompra,
        });
      }
    );
  }

  // ============================================
  //   Borrar un Registro de Compra por el id
  // ============================================
  public async EliminarRegistroCompra(req: Request, res: Response) {
    const id = req.params.id;

    await pool.query(
      'DELETE FROM RegistroCompras81 WHERE Id_RegistroCompras81=?',
      [id],

      function (err, dato, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al eliminar Registro de Compra',
            errors: err,
          });
        }

        if (!dato) {
          return res.status(400).json({
            ok: false,
            mensaje: 'No existe un Registro de Compra con ese id',
            errors: { message: 'No existe un Registro de Compra con ese id' },
          });
        }

        res.status(200).json({
          ok: true,
          RegistroCompra: dato,
        });
      }
    );
  }
}
const registroCompras81Controller = new RegistroCompras81Controller();
export default registroCompras81Controller;
