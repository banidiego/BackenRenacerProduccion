export class OrigenModel {
  Id_Origen: any;
  Codigo_Origen: String;
  Descripcion: String;
  Codigo_PlanContable: String;
  Origen: String;
  Nombre: String;
  Ano: Number;
  Autorizacion: Number;
  Indice: String;

  constructor() {
    this.Id_Origen = null;
    this.Codigo_Origen = '';
    this.Descripcion = '';
    this.Codigo_PlanContable = '';
    this.Origen = '';
    this.Nombre = '';
    this.Ano = 0;
    this.Autorizacion = 0;
    this.Indice = '';
  }
}
