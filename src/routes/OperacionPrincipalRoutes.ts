import express, { Router } from 'express';

import OperacionPrincipalController from '../controllers/OperacionPrincipalController';

class OperacionPrincipalRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/AsientosMes/:Ano/:Mes/:TipoOrigen/:Id_Proyecto',
      OperacionPrincipalController.ListaMensualAnoMesTipoOrigen
    );
    this.router.get(
      '/DatosMenuInformacion/:Ano/:Nombre',
      OperacionPrincipalController.ListaAnoNombreProyecto
    );
    this.router.get(
      '/:Id',
      OperacionPrincipalController.ListaIdOperacionPrincipal
    );
    this.router.get(
      '/MenuInformacion/:Ano',
      OperacionPrincipalController.ListaAno
    );
    this.router.get(
      '/NumeroOperacion/:TipoOrigen/:Ano/:Mes/:Id_Proyecto',
      OperacionPrincipalController.MaxNumeroOperacion
    );
    this.router.post(
      '/',
      OperacionPrincipalController.GuardarOperacionPrincipal
    );
    this.router.put(
      '/:id',
      OperacionPrincipalController.ActualizarOperacionPrincipal
    );
  }
}

export default new OperacionPrincipalRoutes().router;
