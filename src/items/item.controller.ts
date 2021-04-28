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

  public static async delete(req: Request, res: Response) {
    const {
      params: { id },
    } = req;
    try {
      await ItemService.delete(id);
      return res.sendStatus(204);
    } catch (e) {
      const { code, ...error } = e;
      return res.status(code).json({ ...error });
    }
  }

  public static async create(
    req: Request,
    res: Response,
  ): Promise<Record<string, any>> {
    const { body: item } = req;
    const existingItem = await ItemService.exists({
      name: item.name,
    });
    if (existingItem) {
      return res.sendStatus(409);
    }

    const createdItem = await ItemService.create(item);

    return res.status(201).json({
      item: createdItem,
    });
  }
}
