import express, { Router } from 'express';

import PlanProyectoController from '../controllers/PlanProyectoController';

class PlanProyectoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/FiltrarRUC/:Ruc',
      PlanProyectoController.ListaCodigoPlanProyecto
    );
    this.router.get(
      '/Lista/:Ano/:Id_Proyecto',
      PlanProyectoController.ListaAnoCodigoProyecto
    );

    this.router.post('/', PlanProyectoController.GuardarPlanProyecto);
  }
}

export default new PlanProyectoRoutes().router;
