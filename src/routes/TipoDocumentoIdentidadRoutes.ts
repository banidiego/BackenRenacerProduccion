import express, { Router } from 'express';

import TipoDocumentoIdentidadController from '../controllers/TipoDocumentoIdentidadController';

class TipoDocumentoIdentidadRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', TipoDocumentoIdentidadController.Lista);
    this.router.get(
      '/FiltrarTipoDocumento/:Codigo_TipoDocumentoIdentidad',
      TipoDocumentoIdentidadController.TipoDocumentoIdentidadCodigo
    );
  }
}

export default new TipoDocumentoIdentidadRoutes().router;
