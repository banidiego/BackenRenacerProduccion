import express, { Router } from 'express';

import empresaController from '../controllers/EmpresaController';

class EmpresaRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/ListaEmpresas/', empresaController.ListaEmpresas);
    this.router.get(
      '/ListaEmpresasUsuario/:Id_Usuario',
      empresaController.ListaEmpresasUsuario
    );
    this.router.get(
      '/LoginEmpresasId_Usuario/:Id_Usuario',
      empresaController.ListaEmpresasIdUsuario
    );
    this.router.get(
      '/EmpresasNombreEmpresa/:Nombre',
      empresaController.EmpresaNombreEmpresa
    );
  }
}

export default new EmpresaRoutes().router;
