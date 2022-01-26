import express, { Router } from 'express';

import categoriaController from '../controllers/CategoriaController';

import validarJWT from '../middlewares/validar-jwt';

class CategoriaRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/ListaCategoriaIdEmpresa/:Id_Empresa',
      validarJWT,
      categoriaController.ListaCategoriaIdEmpresa
    );
  }
}

export default new CategoriaRoutes().router;
