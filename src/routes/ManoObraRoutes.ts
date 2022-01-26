import express, { Router } from 'express';

import manoObraController from '../controllers/ManoObraController';

class ManoObraRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/ListaManoObraIdEmpresa/:Id_Empresa',
      manoObraController.ListaManoObraId_Empresa
    );
    this.router.get(
      '/SumaManoObraIdEmpresa/:Id_Empresa',
      manoObraController.SumaManoObraId_Empresa
    );
    this.router.post('/', manoObraController.GuardarManoObra);
    this.router.put('/:id', manoObraController.ActualizarManoObra);
    this.router.delete('/:id', manoObraController.EliminarManoObra);
  }
}

export default new ManoObraRoutes().router;
