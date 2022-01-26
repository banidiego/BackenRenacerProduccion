export class CostoProductoDetalleModel {
    Id_CostoProductoDetalle: any;
    Id_CostoProducto: number;
    Id_MateriaPrima: Number;
    Cantidad: number;
    Monto: number;
    
   
  
    constructor() {
      this.Id_CostoProductoDetalle = null;
      this.Id_CostoProducto = 0;
      this.Id_MateriaPrima = 0;
      this.Cantidad = 0;
      this.Monto = 0;
     
    }
  }