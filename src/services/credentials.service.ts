import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/UserModel';

export class Credential {
  static async checkUserCredentials(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { cookies: { user: token = null } = {} } = req;
    const isLogged = await UserModel.exists({
      token,
      tokenValidity: { $gte: new Date() },
    });

    if (!isLogged) {
      res.setHeader('WWW-Authenticate', 'Basic');
      return res.sendStatus(401);
    }
    next();
  }

  static checkAdminCredentials(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (
      !req.cookies ||
      typeof req.cookies.admin === 'undefined' ||
      req.cookies.admin.verified === false
    ) {
      res.setHeader('WWW-Authenticate', 'Basic');
      return res.sendStatus(401);
    }
    next();
  }
}
