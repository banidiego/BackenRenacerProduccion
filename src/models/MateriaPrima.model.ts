export class MateriaPrimaModel {
  Id_MateriaPrima: any;
  Id_Categoria: number;
  Descripcion: string;
  ValorCompra: number;
  Unidad: string;
  FactorConversion: number;
  FactorMerma: number;
  ValorConMerma: number;
  Id_Empresa: number;

  constructor() {
    this.Id_MateriaPrima = null;
    this.Id_Categoria = 0;
    this.Descripcion = '';
    this.ValorCompra = 0;
    this.Unidad = '';
    this.FactorConversion = 0;
    this.FactorMerma = 0;
    this.ValorConMerma = 0;
    this.Id_Empresa = 0;
  }
}
