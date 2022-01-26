import express, { Router } from 'express';

import OrigenController from '../controllers/OrigenController';

class OrigenRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/OrigenAnoIndice/:Ano/:Indice',
      OrigenController.OrigenAnoIndice
    );
    this.router.get(
      '/OrigenAnoIdProyecto/:Ano/:Id_Proyecto',
      OrigenController.OrigenAnoIdProyecto
    );
    this.router.get(
      '/DatosMenuInformacion/:Ano/:Nombre',
      OrigenController.OrigenAnoNombreProyecto
    );
    this.router.get('/MenuInformacion/:Ano', OrigenController.OrigenAno);
    this.router.get(
      '/NombreOrigen/:TipoOrigen/:Origen/:Ano',
      OrigenController.NombreOrigenTipoOrigenOrigenAno
    );
  }
}

export default new OrigenRoutes().router;
