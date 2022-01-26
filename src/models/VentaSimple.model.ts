export class VentaSimpleModel {
  Id_VentaSimple: any;
  Descripcion: String;
  Fecha: Date;
  Monto: number;
  Mes: string;
  Ano: number;
  Bannys: boolean;
  Id_Empresa: number;

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
