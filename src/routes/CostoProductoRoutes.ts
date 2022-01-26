import express, { Router } from 'express';

import CostoProductoController from '../controllers/CostoProductoController';

class CostoProductoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/ListaCostoProducto/:Id_Empresa',
      CostoProductoController.ListaCostoProductoIdEmpresa
    );
    this.router.get(
      '/CostoProducto/:Id_CostoProducto/:Id_Empresa',
      CostoProductoController.ObtenerCostoProductoIdCostoIdEmpresa
    );
    this.router.post('/', CostoProductoController.GuardarCostoProducto);
    // this.router.put(
    //   '/ActualizarCostoFijo/:Id_CostoFijo/:Id_Empresa',
    //   costoFijoController.ActualizarCostoFijo
    // );
  }
}

export default new CostoProductoRoutes().router;
