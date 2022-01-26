import express, { Router } from 'express';

import otroGastoController from '../controllers/OtroGastoController';

class OtroGastoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/ListaOtroGastoIdEmpresa/:Id_Empresa',
      otroGastoController.ListaOtroGastoId_Empresa
    );
    this.router.get(
      '/SumaOtroGastoIdEmpresa/:Id_Empresa',
      otroGastoController.SumaOtroGastoId_Empresa
    );
    this.router.post('/', otroGastoController.GuardarOtroGasto);
    this.router.put('/:id', otroGastoController.ActualizarOtroGasto);
    this.router.delete('/:id', otroGastoController.EliminarOtroGasto);
  }
}

export default new OtroGastoRoutes().router;
