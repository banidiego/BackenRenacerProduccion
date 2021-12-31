"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaSimpleModel = void 0;
class VentaSimpleModel {
    constructor() {
        this.Id_VentaSimple = null;
        this.Descripcion = '';
        this.Fecha = new Date();
        this.Monto = 0;
        this.Mes = '';
        this.Ano = 0;
        this.Bannys = true;
        this.Id_Empresa = 0;
    }
}
exports.VentaSimpleModel = VentaSimpleModel;
