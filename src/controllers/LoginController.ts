import { Request, Response } from 'express';

import pool from '../database';
import { UsuarioModel } from '../models/Usuario.model';

const CLIENT_ID =
  '278464843479-iunvf1v38nm237kv1oc18troinb0nvte.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

async function verify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  // const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
    payload,
  };
}

class LoginController {
  public async AutentificacionGoogle(req: Request, res: Response) {
    var token = req.body.token || 'XXX';
    var googleUser: any = await verify(token).catch((e) => {
      return res.status(403).json({
        ok: false,
        mensaje: 'Token no válido',
      });
    });

    // var client = new auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET, '');

    await pool.query(
      'SELECT * FROM Usuario WHERE email = ?',
      [googleUser.email],
      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: true,
            mensaje: 'Error al buscar usuario - login',
            errors: err,
          });
        }

        datos[0].nombre = googleUser.nombre;
        datos[0].img = googleUser.img;

        return res.status(200).json({
          ok: true,
          usuario: datos,
          token,
          id: datos[0].Id_Usuario,
        });
      }
    );
  }
}

const loginController = new LoginController();
export default loginController;
