export class OtroGastoModel {
  Id_OtroGasto: any;
  Descripcion: string;
  Total: number;
  Diario: number;
  Id_Empresa: number;

  constructor() {
    this.Id_OtroGasto = null;
    this.Descripcion = '';
    this.Total = 0;
    this.Diario = 0;
    this.Id_Empresa = 0;
  }
}
