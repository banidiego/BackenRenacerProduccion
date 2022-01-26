export class DetalleSRModel {
  Id_DetalleSR: any;
  Id_SR: Number;
  Codigo_PlanProyecto: String;
  Presupuesto: Number;
  Gasto: Number;
  Actividad: String;

  constructor() {
    this.Id_DetalleSR = null;
    this.Id_SR = 0;
    this.Codigo_PlanProyecto = '';
    this.Presupuesto = 0;
    this.Gasto = 0;
    this.Actividad = '';
  }
}
