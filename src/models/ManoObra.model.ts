export class ManoObraModel {
  Id_ManoObra: any;
  ApellidosNombres: string;
  Salario: number;
  DiasLaborales: number;
  HorasDiarias: number;
  Id_Empresa: number;

  constructor() {
    this.Id_ManoObra = null;
    this.ApellidosNombres = '';
    this.Salario = 0;
    this.DiasLaborales = 0;
    this.HorasDiarias = 0;
    this.Id_Empresa = 0;
  }
}
