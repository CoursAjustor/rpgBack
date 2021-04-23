import { Request, Response } from 'express';
import { ItemService } from './item.service';

export class ItemController {
  public static async index(
    req: Request,
    res: Response,
  ): Promise<Record<string, any>> {
    const items = await ItemService.getAll();
    return res
      .json({
        items,
      })
      .status(200);
  }

  public static async create(
    req: Request,
    res: Response,
  ): Promise<Record<string, any>> {
    const { body: item } = req;
    const existingUser = await ItemService.exists({
      name: item.name,
    });
    if (existingUser) {
      return res.sendStatus(409);
    }

    const user = await ItemService.create(item);

    return res.status(201).json({
      user,
    });
  }
}
