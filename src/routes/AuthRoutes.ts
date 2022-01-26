import express, { Router } from 'express';

import AuthController from '../controllers/AuthController';
import validarJWT from '../middlewares/validar-jwt';

class AuthRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post('/', AuthController.Login);
    this.router.get('/RenewToken', validarJWT, AuthController.RenewToken);
  }
}

export default new AuthRoutes().router;
