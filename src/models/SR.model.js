"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRModel = void 0;
class SRModel {
    constructor() {
        this.Id_SR = null;
        this.Numero = 0;
        this.Serie = '';
        this.Responsable = '';
        this.RUCResponsable = '';
        this.FechaSolicitud = new Date();
        this.EntidadCooperante = '';
        this.Cheque = '';
        this.MonedaCheque = '';
        this.ImporteCheque = 0;
        this.TCCheque = 0;
        this.Descripcion = '';
        this.FechaRendicion = new Date();
        this.Observaciones = '';
        this.Presupuesto = 0;
        this.NRI = '';
        this.MontoRI = 0;
        this.NCC = '';
        this.MontoCC = 0;
        this.TotalGasto = 0;
        this.Id_Verificacion = 0;
        this.Tipo = 0;
        this.Bloqueado = false;
        this.Rendido = false;
        this.Rubro = '';
        this.Mes = '';
        this.Ano = 0;
        this.Id_Proyecto = 0;
        this.Cerrado = false;
    }
}
exports.SRModel = SRModel;
