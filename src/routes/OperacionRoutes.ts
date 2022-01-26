import express, { Router } from 'express';

import OperacionController from '../controllers/OperacionController';

class OperacionRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/Asiento/:Id_OperacionPrincipal',
      OperacionController.ListaOperacionPrincipal
    );
    this.router.get(
      '/RegistroGasto/:Id_DetalleSR',
      OperacionController.ListaOperacionIdDetalleSRRegistroGasto
    );
    this.router.get('/SR/:Id_SR', OperacionController.ListaId_SR);

    this.router.post('/', OperacionController.GuardarOperacion);
    this.router.put('/:id', OperacionController.ActualizarOperacion);
    this.router.delete('/:id', OperacionController.EliminarOperacion);
  }
}

export default new OperacionRoutes().router;
