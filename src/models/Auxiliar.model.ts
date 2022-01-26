export class AuxiliarModel {
  Id_Auxiliar: any;
  RUC: String;
  ApellidoPaterno: String;
  ApellidoMaterno: String;
  Nombres: String;
  RazonSocial: String;
  Direccion: String;
  Codigo_TipoDocumentoIdentidad: string;
  constructor() {
    this.Id_Auxiliar = 1;
    this.RUC = '';
    this.ApellidoPaterno = '';
    this.ApellidoMaterno = '';
    this.Nombres = '';
    this.RazonSocial = '';
    this.Direccion = '';
    this.Codigo_TipoDocumentoIdentidad = '';
  }
}
