export class CostoProductoModel {
  Id_CostoProducto: any;
  Descripcion: string;
  MinutosProduccion: number;
  UnidadesProducidas: number;
  TotalCostosFijos: number;
  TotalCostoVariable: number;
  TiempoTotal: number;
  PrecioUnitarioVenta: number;
  Id_Empresa: number;

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
