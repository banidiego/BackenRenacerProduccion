import express, { Router } from 'express';

import tipoRegistroController from '../controllers/TipoRegistroController';

class TipoRegistroRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', tipoRegistroController.Lista);
  }
}

export default new TipoRegistroRoutes().router;
