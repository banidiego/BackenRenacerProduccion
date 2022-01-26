import express, { Router } from 'express';

import registroCompras81Controller from '../controllers/RegistroCompras81Controller';
import validarJWT from '../middlewares/validar-jwt';

class RegistroCompras81Routes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/UltimoCorrelativo/:Ano/:Mes/:Id_Empresa',
      validarJWT,
      registroCompras81Controller.UltimoCorrelativo
    );
    this.router.get(
      '/RegistrosFechaIdEmpresa/:Fecha/:Id_Empresa',
      validarJWT,

      registroCompras81Controller.RegistrosFechaIdEmpresa
    );
    this.router.get(
      '/SumaRegistrosFechaIdEmpresa/:Fecha/:Id_Empresa',
      validarJWT,

      registroCompras81Controller.SumaRegistrosFechaIdEmpresa
    );
    this.router.get(
      '/ListadoDiarioMesAnoIdEmpresa/:Mes/:Ano/:Id_Empresa',
      validarJWT,

      registroCompras81Controller.ListadoDiarioMesAnoIdEmpresa
    );
    this.router.get(
      '/RegistroIdRegistro/:Id_Registro',
      validarJWT,

      registroCompras81Controller.RegistroIdRegistro
    );
    this.router.get(
      '/GastosMensuales/:Bannys',
      validarJWT,

      registroCompras81Controller.GastosMensuales
    );
    this.router.get(
      '/GastosDiarios/:Id_Empresa/:Bannys',
      validarJWT,

      registroCompras81Controller.GastosDiarios
    );
    this.router.get(
      '/ReporteCompras81/:Id_Empresa/:Mes/:Ano',
      validarJWT,

      registroCompras81Controller.ReporteGasto81
    );
    this.router.get(
      '/ReporteCompras81CSV/:Id_Empresa/:Ano/:Mes',

      registroCompras81Controller.DescargarReporte
    );
    this.router.post(
      '/ComprasPeriodo/:Id_Empresa/:Bannys',
      validarJWT,
      registroCompras81Controller.ComprasPeriodo
    );
    this.router.post(
      '/',
      validarJWT,
      registroCompras81Controller.GuardarRegistroCompra
    );
    this.router.put(
      '/:id',
      validarJWT,
      registroCompras81Controller.ActualizarRegistroCompra
    );
    this.router.delete(
      '/:id',
      validarJWT,
      registroCompras81Controller.EliminarRegistroCompra
    );
  }
}

export default new RegistroCompras81Routes().router;
