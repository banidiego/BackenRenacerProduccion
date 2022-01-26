import express, { Router } from 'express';

import TipoComprobanteController from '../controllers/TipoComprobanteController';

class TipoComprobanteRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', TipoComprobanteController.Lista);
    this.router.get(
      '/FiltrarTipoDocumento/:Codigo_TipoDocumento',
      TipoComprobanteController.TipoDocumentoCodigo
    );
  }
}

export default new TipoComprobanteRoutes().router;
