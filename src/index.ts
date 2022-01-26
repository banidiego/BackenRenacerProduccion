import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import path from 'path';

import indexRoutes from './routes/indexRoutes';
import AuxiliarRoutes from './routes/AuxiliarRoutes';
import AutorizacionRoutes from './routes/AutorizacionRoutes';
import DetalleSRRoutes from './routes/DetalleSRRoutes';
import MedioPagoRoutes from './routes/MedioPagoRoutes';
import OperacionPrincipalRoutes from './routes/OperacionPrincipalRoutes';
import OperacionRoutes from './routes/OperacionRoutes';
import OrigenRoutes from './routes/OrigenRoutes';
import PlanContableRoutes from './routes/PlanContableRoutes';
import PlanProyectoRoutes from './routes/PlanProyectoRoutes';
import ProyectoRoutes from './routes/ProyectoRoutes';
import SRRoutes from './routes/SRRoutes';
import TipoDocumentoIdentidadRoutes from './routes/TipoDocumentoIdentidadRoutes';
import TipoComprobanteRoutes from './routes/TipoComprobanteRoutes';

import LoginRoutes from './routes/LoginRoutes';

import AuthRoutes from './routes/AuthRoutes';

import TipoRegistroRoutes from './routes/TipoRegistroRoutes';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);

    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use('/', indexRoutes);
    this.app.use('/Login', LoginRoutes);
    this.app.use('/Auth', AuthRoutes);
    this.app.use('/Origen', OrigenRoutes);
    this.app.use('/OperacionPrincipal', OperacionPrincipalRoutes);
    this.app.use('/Operacion', OperacionRoutes);
    this.app.use('/Proyecto', ProyectoRoutes);
    this.app.use('/Auxiliar', AuxiliarRoutes);
    this.app.use('/MedioPago', MedioPagoRoutes);
    this.app.use('/TipoComprobante', TipoComprobanteRoutes);
    this.app.use('/TipoRegistro', TipoRegistroRoutes);
    this.app.use('/PlanProyecto', PlanProyectoRoutes);
    this.app.use('/PlanContable', PlanContableRoutes);
    this.app.use('/SR', SRRoutes);
    this.app.use('/DetalleSR', DetalleSRRoutes);
    this.app.use('/uploads', express.static(path.resolve('uploads')));
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'));
    });
  }
}

const server = new Server();
server.start();
