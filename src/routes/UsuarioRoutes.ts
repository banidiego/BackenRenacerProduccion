import express, { Router } from 'express';

import multer from '../libs/multer';

import VariablesSesionController from '../controllers/VariablesSesionController';
import usuarioController from '../controllers/UsuarioController';

class UsuarioRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/CargaDatos/:id',
      VariablesSesionController.VariableSesionId
    );
    this.router.post(
      '/',
      multer.single('Imagen'),
      usuarioController.GuardarUsuario
    );
    this.router.put(
      '/:id',
      multer.single('Imagen'),
      usuarioController.ActualizarUsuario
    );
    this.router.delete('/:id', usuarioController.EliminarUsuario);
  }
}

export default new UsuarioRoutes().router;
