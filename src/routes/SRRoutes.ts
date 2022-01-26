import express, { Router } from 'express';

import SRController from '../controllers/SRController';

class SRRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/SolicitudesMes/:Ano/:Mes/:Id_Proyecto',
      SRController.ListaAnoMesIdProyecto
    );
    this.router.get(
      '/NumeroSolicitud/:Ano/:Id_Proyecto',
      SRController.MaximoNumeroSolicitud
    );
    this.router.get('/:Id_SR', SRController.ListaIdSR);
    this.router.post('/', SRController.GuardarSR);
    this.router.put('/:id', SRController.ActualizarSR);
  }
}

export default new SRRoutes().router;
