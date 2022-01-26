import express, { Router } from 'express';

import AuxiliarController from '../controllers/AuxiliarController';

class AuxiliarRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/FiltrarRUC/:Ruc', AuxiliarController.ListaAuxiliaresRUC);
    this.router.get(
      '/FiltrarRazonSocial/:RazonSocial',
      AuxiliarController.ListaAuxiliaresRazonSocial
    );
    this.router.get('/', AuxiliarController.ListaAuxiliares);
    this.router.post('/', AuxiliarController.GuardarAuxiliar);
    this.router.put('/:id', AuxiliarController.ActualizarAuxiliar);
    this.router.delete('/:id', AuxiliarController.EliminarAuxiliar);
  }
}

export default new AuxiliarRoutes().router;
