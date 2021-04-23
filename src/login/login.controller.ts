import { Request, Response } from 'express';
import { LoginService } from './login.service';

export class LoginController {
  public static async login(
    req: Request,
    res: Response,
  ): Promise<Record<string, any>> {
    const { body } = req;

    try {
      const user = await LoginService.login(body);

      res.cookie('user', user.token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.sendStatus(200);
    } catch (e) {
      const { code, ...error } = e;
      return res.status(code).json({ ...error });
    }
  }

  public static async logout(
    req: Request,
    res: Response,
  ): Promise<Record<string, any>> {
    try {
      res.clearCookie('user');
      return res.sendStatus(200);
    } catch (e) {
      const { code = 403, ...error } = e;
      return res.status(code).json({ ...error });
    }
  }
}
