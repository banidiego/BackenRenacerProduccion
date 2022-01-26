import * as express from 'express';
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../VariablesGlobales';

const validarJWT = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  // Leer el Token
  let token: any = req.header('x-token');

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: 'No hay Token en la petición',
    });
  }

  try {
    let datosJWT: any = jwt.verify(token, JWT_SECRET);

    console.log(datosJWT.uid);

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }
};

export default validarJWT;
