import express, { Router } from 'express';

import MedioPagoController from '../controllers/MedioPagoController';

class MedioPagoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', MedioPagoController.Lista);
  }
}

export default new MedioPagoRoutes().router;
