import express, { Router } from 'express';

import ProyectoController from '../controllers/ProyectoController';
import validarJWT from '../middlewares/validar-jwt';

class ProyectoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/ProyectoActual/:Id_Proyecto',

      ProyectoController.ProyectoIdProyecto
    );
    this.router.post('/', ProyectoController.GuardarProyecto);
  }
}

export default new ProyectoRoutes().router;
