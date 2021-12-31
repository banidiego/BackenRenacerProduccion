"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const AuxiliarRoutes_1 = __importDefault(require("./routes/AuxiliarRoutes"));
const DetalleSRRoutes_1 = __importDefault(require("./routes/DetalleSRRoutes"));
const MedioPagoRoutes_1 = __importDefault(require("./routes/MedioPagoRoutes"));
const OperacionPrincipalRoutes_1 = __importDefault(require("./routes/OperacionPrincipalRoutes"));
const OperacionRoutes_1 = __importDefault(require("./routes/OperacionRoutes"));
const OrigenRoutes_1 = __importDefault(require("./routes/OrigenRoutes"));
const PlanContableRoutes_1 = __importDefault(require("./routes/PlanContableRoutes"));
const PlanProyectoRoutes_1 = __importDefault(require("./routes/PlanProyectoRoutes"));
const ProyectoRoutes_1 = __importDefault(require("./routes/ProyectoRoutes"));
const SRRoutes_1 = __importDefault(require("./routes/SRRoutes"));
const TipoComprobanteRoutes_1 = __importDefault(require("./routes/TipoComprobanteRoutes"));
const LoginRoutes_1 = __importDefault(require("./routes/LoginRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const TipoRegistroRoutes_1 = __importDefault(require("./routes/TipoRegistroRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default({ origin: '*' }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/Login', LoginRoutes_1.default);
        this.app.use('/Auth', AuthRoutes_1.default);
        this.app.use('/Origen', OrigenRoutes_1.default);
        this.app.use('/OperacionPrincipal', OperacionPrincipalRoutes_1.default);
        this.app.use('/Operacion', OperacionRoutes_1.default);
        this.app.use('/Proyecto', ProyectoRoutes_1.default);
        this.app.use('/Auxiliar', AuxiliarRoutes_1.default);
        this.app.use('/MedioPago', MedioPagoRoutes_1.default);
        this.app.use('/TipoComprobante', TipoComprobanteRoutes_1.default);
        this.app.use('/TipoRegistro', TipoRegistroRoutes_1.default);
        this.app.use('/PlanProyecto', PlanProyectoRoutes_1.default);
        this.app.use('/PlanContable', PlanContableRoutes_1.default);
        this.app.use('/SR', SRRoutes_1.default);
        this.app.use('/DetalleSR', DetalleSRRoutes_1.default);
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
