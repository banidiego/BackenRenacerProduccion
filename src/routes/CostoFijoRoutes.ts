import express, { Router } from 'express';

import costoFijoController from '../controllers/CostoFijoController';

class CostoFijoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/CostoFijoIdEmpresa/:Id_Empresa',
      costoFijoController.ObtenerCostoFijoIdEmpresa
    );
    this.router.put(
      '/ActualizarCostoFijo/:Id_CostoFijo/:Id_Empresa',
      costoFijoController.ActualizarCostoFijo
    );
  }
}

export default new CostoFijoRoutes().router;
