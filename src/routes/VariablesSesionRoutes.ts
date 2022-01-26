import express, { Router } from 'express';

import VariablesSesionController from '../controllers/VariablesSesionController';

class VariablesSesionRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/CargaDatos/:id',
      VariablesSesionController.VariableSesionId
    );
    this.router.put('/:id', VariablesSesionController.ActualizarVariableSesion);
  }
}

export default new VariablesSesionRoutes().router;
