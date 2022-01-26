import { Request, Response } from 'express';

import pool from '../database';
import { UsuarioModel } from '../models/Usuario.model';

import generarJWT from '../helpers/jwt';

class AuthController {
  // ==========================================
  // Comprobar Contraseña
  // ==========================================
  public async Login(req: Request, res: Response) {
    var body = req.body;

    await pool.query(
      'SELECT * FROM Usuario WHERE Usuario = ? and Password=?',
      [body.Usuario, body.Password],
      async function (err, datos, fields) {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error filtrando Auxiliar',
            errors: err,
          });
        }
        // Comprueba si existen registros
        const count = datos.length;
        if (count) {
          // Generar Token

          const token = await generarJWT(datos[0].Id_Usuario);

          return res.status(200).json({
            ok: true,
            Usuario: datos,
            token: token,
          });
        } else {
          return res.status(400).json({
            ok: false,
            mensaje: 'No coincide el Usuario o el Password',
            errors: err,
            count: count,
          });
        }
      }
    );
  }

  // ==========================================
  // Renovar Token
  // ==========================================
  public async RenewToken(req: Request, res: Response) {
    const uid = req.params.uid;
    const token = await generarJWT(uid);

    return res.status(200).json({
      ok: true,

      token: token,
    });
  }
}

const authController = new AuthController();
export default authController;
