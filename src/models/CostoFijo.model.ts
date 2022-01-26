export class CostoFijoModel {
  Id_CostoFijo: any;
  DiasLaborables: number;
  ManoObraTotal: Number;
  ManoObraDiario: number;
  ManoObraHora: number;
  ManoObraMinuto: number;
  AlquilerTotal: Number;
  AlquilerDiario: number;
  LuzElectricaTotal: Number;
  LuzElectricaDiario: number;
  AguaTotal: Number;
  AguaDiario: number;
  ProductosVendidosMes: Number;
  OtrosGastosTotal: number;
  OtrosGastosDiario: Number;
  Id_Empresa: Number;

  constructor() {
    this.Id_CostoFijo = null;
    this.DiasLaborables = 0;
    this.ManoObraTotal = 0;
    this.ManoObraDiario = 0;
    this.ManoObraHora = 0;
    this.ManoObraMinuto = 0;
    this.AlquilerTotal = 0;
    this.AlquilerDiario = 0;
    this.LuzElectricaTotal = 0;
    this.LuzElectricaDiario = 0;
    this.AguaTotal = 0;
    this.AguaDiario = 0;
    this.ProductosVendidosMes = 0;
    this.OtrosGastosTotal = 0;
    this.OtrosGastosDiario = 0;
    this.Id_Empresa = 0;
  }
}
