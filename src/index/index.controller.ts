import { Request, Response } from 'express';
export class IndexController {
  public static async index(
    req: Request,
    res: Response,
  ): Promise<Record<string, any>> {
    return res.sendStatus(200);
  }
}
