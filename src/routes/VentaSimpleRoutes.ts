import express, { Router } from 'express';
import ventaSimpleController from '../controllers/VentaSimpleController';
import validarJWT from '../middlewares/validar-jwt';

class VentaSimpleRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get(
      '/VentasSimplesMesAnoIdEmpresa/:Mes/:Ano/:Id_Empresa',
      validarJWT,
      ventaSimpleController.VentasMesAnoIdEmpresa
    );
    this.router.get(
      '/RegistrosFechaIdEmpresa/:Fecha/:Id_Empresa',
      validarJWT,

      ventaSimpleController.RegistrosFechaIdEmpresa
    );
    this.router.get(
      '/SumaRegistrosFechaIdEmpresa/:Fecha/:Id_Empresa',
      validarJWT,

      ventaSimpleController.SumaRegistrosFechaIdEmpresa
    );

    this.router.get(
      '/VentasDiaFechaIdEmpresa/:Fecha/:Id_Empresa/:Bannys',
      validarJWT,

      ventaSimpleController.VentasDiaFechaIdEmpresa
    );
    this.router.get(
      '/VentasSimplesMesAnoIdEmpresa/:Mes/:Ano/:Id_Empresa',
      ventaSimpleController.VentasMesAnoIdEmpresa
    );
    this.router.get(
      '/VentasMensuales/:Id_Empresa/:Bannys',
      validarJWT,
      ventaSimpleController.VentasMensuales
    );
    this.router.get(
      '/VentasDiarias/:Id_Empresa/:Bannys',
      validarJWT,
      ventaSimpleController.VentasDiarias
    );
    this.router.post('/', validarJWT, ventaSimpleController.GuardarVentaSimple);
    this.router.post(
      '/VentasPeriodo/:Id_Empresa/:Bannys',
      validarJWT,
      ventaSimpleController.VentasPeriodo
    );
    this.router.put(
      '/:id',
      validarJWT,
      ventaSimpleController.ActualizarVentaSimple
    );
    this.router.delete(
      '/:id',
      validarJWT,
      ventaSimpleController.EliminarVentaSimple
    );
  }
}

export default new VentaSimpleRoutes().router;
