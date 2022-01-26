export class VariableSesionModel {
  Id_VariableSesion: any;
  NombreProyecto: String;
  Origen: String;
  Indice: String;
  Ano: Number;
  Mes: String;
  Id_Usuario: Number;

  constructor() {
    this.Id_VariableSesion = null;
    this.NombreProyecto = '';
    this.Origen = '';
    this.Indice = '';
    this.Ano = 0;
    this.Mes = '';
    this.Id_Usuario = 0;
  }
}
