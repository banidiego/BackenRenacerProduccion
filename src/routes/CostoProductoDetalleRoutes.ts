import express, { Router } from 'express';
import costoProductoController from '../controllers/CostoProductoController';
import costoProductoDetalleController from '../controllers/CostoProductoDetalleController';

import CostoProductoDetalleController from '../controllers/CostoProductoDetalleController';

class CostoProductoDetalleRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/ListaCostoProductoDetalle/:Id_CostoProducto',
      costoProductoDetalleController.ListaCostoProductoIdCostoProducto
    );
    this.router.get(
      '/CostoProductoDetalleId/:Id_CostoProductoDetalle',
      costoProductoDetalleController.CostoProductoDetalleId
    );
    this.router.get(
      '/TablaCostoProductoDetalles/:Id_CostoProducto',
      costoProductoDetalleController.TablaCostoProductoDetalle
    );
    this.router.get(
      '/SumaTablaCostoProductoDetalles/:Id_CostoProducto',
      costoProductoDetalleController.SumaListaCostoProductoIdCostoProducto
    );
    this.router.post(
      '/',
      costoProductoDetalleController.GuardarCostoProductoDetalle
    );
    this.router.put(
      '/:Id_CostoProductoDetalle',
      costoProductoDetalleController.ActualizarCostoProductoDetalle
    );
  }
}

export default new CostoProductoDetalleRoutes().router;
