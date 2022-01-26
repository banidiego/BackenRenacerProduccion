import express, { Router } from 'express';

import validarJWT from '../middlewares/validar-jwt';
import reportesGlobalesController from '../controllers/ReportesGlobalesController';

class ReportesGlobalesRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/VentasGastosMesAnoIdEmpresaBannys/:Mes/:Ano/:Fecha/:Id_Empresa',
      validarJWT,
      reportesGlobalesController.VentasGastosMesAnoIdEmpresaBannys
    );
    this.router.get(
      '/GastosVentasUtilidadesMensuales/:Id_Empresa/:Bannys',
      validarJWT,
      reportesGlobalesController.GastosVentasUtilidadesMensuales
    );
    this.router.get(
      '/GastosVentasUtilidadesDiarios/:Id_Empresa/:Bannys',
      validarJWT,
      reportesGlobalesController.GastosVentasUtilidadesDiarios
    );
  }
}

export default new ReportesGlobalesRoutes().router;
