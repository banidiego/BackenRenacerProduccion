"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleAutorizacionDolaresModel = void 0;
class DetalleAutorizacionDolaresModel {
    constructor() {
        this.Id_DetalleAutorizacionDolares = null;
        this.Id_Autorizacion = 0;
        this.NumeroCheque = '';
        this.Fecha = new Date();
        this.Responsable = '';
        this.RUCResponsable = '';
        this.Descripcion = '';
        this.MontoDolares = 0;
        this.TC = 0;
        this.MontoSoles = 0;
        this.Id_SR = 0;
        this.Saldo = 0;
        this.Agotamiento = false;
    }
}
exports.DetalleAutorizacionDolaresModel = DetalleAutorizacionDolaresModel;
