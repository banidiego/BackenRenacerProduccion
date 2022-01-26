import express, { Router } from 'express';

import materiaPrimaController from '../controllers/MateriaPrimaController';

class MateriaPrimaRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/ListaTablaMateriaPrimaIdEmpresa/:Id_Empresa',
      materiaPrimaController.ListaTablaMateriaPrimaId_Empresa
    );
    this.router.get(
      '/ListaMateriaPrimaIdEmpresa/:Id_Empresa',
      materiaPrimaController.ListaMateriaPrimaId_Empresa
    );

    this.router.get(
      '/MateriaPrimaDescripcion_MateriaPrimaIdEmpresa/:Descripcion_MateriaPrima/:Id_Empresa',
      materiaPrimaController.MateriaPrimaDescripcionId_Empresa
    );
    this.router.get(
      '/MateriaPrimaId_MateriaPrimaIdEmpresa/:Id_MateriaPrima/:Id_Empresa',
      materiaPrimaController.MateriaPrimaId_MateriaPrimaId_Empresa
    );
    this.router.post('/', materiaPrimaController.GuardarMateriaPrima);
    this.router.put('/:id', materiaPrimaController.ActualizarMateriaPrima);
    this.router.delete('/:id', materiaPrimaController.EliminarMateriaPrima);
  }
}

export default new MateriaPrimaRoutes().router;
