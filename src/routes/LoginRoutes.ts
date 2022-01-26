import express, { Router } from 'express';

import LoginController from '../controllers/LoginController';

class LoginRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post('/Google', LoginController.AutentificacionGoogle);
  }
}

export default new LoginRoutes().router;
