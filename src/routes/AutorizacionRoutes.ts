import express, { Router } from 'express';

import AutorizacionController from '../controllers/AutorizacionController';

class AutorizacionRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    // this.router.post('/', AutorizacionController);
  }
}

export default new AutorizacionRoutes().router;
