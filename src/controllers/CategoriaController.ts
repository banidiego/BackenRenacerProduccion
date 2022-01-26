import { Request, Response } from 'express';

import pool from '../database';
import { CategoriaModel } from '../models/Categoria.model';

class CategoriaController {
  // ==========================================
  // Obtener Lista de Categorias por Id_Empresa
  // ==========================================
  public async ListaCategoriaIdEmpresa(req: Request, res: Response) {
    const id = req.params.Id_Empresa;

    await pool.query(
      'SELECT * FROM Categoria WHERE Id_Empresa = ? order by Id_Categoria asc',
      [id],
      function (err, datos, fields) {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error fltrando Auxiliar',
            errors: err,
          });
        }

        return res.status(200).json({
          ok: true,
          Categoria: datos,
        });
      }
    );
  }
}

const categoriaController = new CategoriaController();
export default categoriaController;
