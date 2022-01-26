export class PlanContableModel {
  Id_PlanContable: any;
  Codigo_PlanCuenta: String;
  Nombre_PlanCuenta: String;
  DebeApertura: Number;
  HaberApertura: Number;
  DebeMovimientoAnual: Number;
  HaberMovimientoAnual: Number;
  DeudorSaldos: Number;
  AcreedorSaldos: Number;
  DeudorSaldosAjustados: Number;
  AcreedorSaldosAjustados: Number;
  ActivoBG: Number;
  PasivoBG: Number;
  PerdidaFuncion: Number;
  GananciaFuncion: Number;
  PerdidaNaturaleza: Number;
  GananciaNaturaleza: Number;
  Movimiento: Boolean;
  CuentaActiva: Boolean;
  Id_Proyecto: number;
  Ano: Number;

  constructor() {
    this.Id_PlanContable = null;
    this.Codigo_PlanCuenta = '';
    this.Nombre_PlanCuenta = '';
    this.DebeApertura = 0;
    this.HaberApertura = 0;
    this.DebeMovimientoAnual = 0;
    this.HaberMovimientoAnual = 0;
    this.DeudorSaldos = 0;
    this.AcreedorSaldos = 0;
    this.DeudorSaldosAjustados = 0;
    this.AcreedorSaldosAjustados = 0;
    this.ActivoBG = 0;
    this.PasivoBG = 0;
    this.PerdidaFuncion = 0;
    this.GananciaFuncion = 0;
    this.PerdidaNaturaleza = 0;
    this.GananciaNaturaleza = 0;
    this.Movimiento = false;
    this.CuentaActiva = false;
    this.Id_Proyecto = 0;
    this.Ano = 0;
  }
}
