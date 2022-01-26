import express, { Router } from 'express';

import PlanContableController from '../controllers/PlanContableController';

class PlanContableRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/FiltrarCodigo/:Codigo_PlanCuenta/:Ano',
      PlanContableController.ListaCodigoPlanCuentaAno
    );
    this.router.get('/Lista/:Ano', PlanContableController.ListaAno);

    this.router.post('/', PlanContableController.GuardarPlanContable);
  }
}

export default new PlanContableRoutes().router;
