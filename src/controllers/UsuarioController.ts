import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

import pool from '../database';

import { UsuarioModel } from '../models/Usuario.model';

class UsuarioController {
  // // ==========================================
  // // Obtener Información de Variables de Sesión - Si no Exite lo crea
  // // ==========================================
  // public async VariableSesionId(req: Request, res: Response) {
  //   const Id = req.params.id;
  //   await pool.query(
  //     'SELECT * FROM VariableSesion WHERE Id_Usuario = ?',
  //     [Id],

  //     function (err, datos, fields) {
  //       if (err) {
  //         return res.status(500).json({
  //           ok: false,
  //           mensaje: 'Error cargando Variables de Sesión',
  //           errors: err,
  //         });
  //       }

  //       return res.status(200).json({
  //         ok: true,
  //         VariablesSesion: datos[0],
  //       });
  //     }
  //   );
  // }

  // ==========================================
  // Crear usuario
  // ==========================================
  public async GuardarUsuario(req: Request, res: Response) {
    var usuario = new UsuarioModel();
    var body = req.body;

    usuario.Id_Usuario = null;
    usuario.Usuario = body.Usuario;
    usuario.Password = body.Password;
    usuario.Nombres = body.Nombres;
    usuario.Email = body.Email;
    usuario.Imagen = req.file.path;

    await pool.query('INSERT INTO Usuario set ?', usuario, (err, datos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al crear Usuario',
          errors: err,
        });
      }

      usuario.Id_Usuario = datos.insertId;
      res.status(201).json({
        ok: true,
        Usuario: usuario,
      });
    });

    // console.log('Guardando Imagenes');
    // console.log(req.file.path);

    // return res.json({
    //   mensaje: 'Foto Guardada!',
    // });
  }

  // ==========================================
  // Actualizar Usuario
  // ==========================================
  public async ActualizarUsuario(req: Request, res: Response) {
    const id = req.params.id;

    var usuario = new UsuarioModel();
    var body = req.body;

    usuario.Id_Usuario = id;
    usuario.Usuario = body.Usuario;
    usuario.Password = body.Password;
    usuario.Nombres = body.Nombres;
    usuario.Email = body.Email;
    usuario.Imagen = req.file.path;

    await pool.query(
      'Select Imagen from Usuario where Id_Usuario=?',
      [id],
      (err, datos) => {
        if (err) {
        } else {
          if (path.resolve(datos[0].Imagen)) {
            fs.unlink(path.resolve(datos[0].Imagen));
          }
        }
      }
    );

    await pool.query(
      'UPDATE Usuario set ? WHERE Id_Usuario = ?',
      [usuario, id],
      (err, datos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar Usuario',
            errors: err,
          });
        }

        res.status(200).json({
          ok: true,
          Usuario: usuario,
        });
      }
    );
  }

  // ============================================
  //   Eliminar Usuario
  // ============================================
  public async EliminarUsuario(req: Request, res: Response) {
    const id = req.params.id;

    await pool.query(
      'DELETE FROM Usuario WHERE Id_Usuario=?',
      [id],

      function (err, dato, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al eliminar Usuario',
            errors: err,
          });
        }

        if (!dato) {
          return res.status(400).json({
            ok: false,
            mensaje: 'No existe un Usuario con ese id',
            errors: { message: 'No existe un Usuario con ese id' },
          });
        }

        if (dato) {
          fs.unlink(path.resolve(dato.Imagen));
        }

        res.status(200).json({
          ok: true,
          Usuario: dato,
        });
      }
    );
  }
}
const usuarioController = new UsuarioController();
export default usuarioController;
