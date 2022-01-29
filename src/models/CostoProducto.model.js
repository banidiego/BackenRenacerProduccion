"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostoProductoModel = void 0;
class CostoProductoModel {
    constructor() {
        this.Id_CostoProducto = null;
        this.Descripcion = '';
        this.MinutosProduccion = 0;
        this.UnidadesProducidas = 0;
        this.TotalCostosFijos = 0;
        this.TotalCostoVariable = 0;
        this.TiempoTotal = 0;
        this.PrecioUnitarioVenta = 0;
        this.Id_Empresa = 0;
    }
}
exports.CostoProductoModel = CostoProductoModel;
