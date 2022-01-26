export class AuthModel {
  Usuario: any;
  Empresa: string;
  Password: string;

  constructor() {
    this.Usuario = null;
    this.Empresa = '';
    this.Password = '';
  }
}
