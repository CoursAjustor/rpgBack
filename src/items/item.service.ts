import { ItemDocument, ItemModel } from '../models/ItemModel';
import { Item } from './interface/item.interface';

export class ItemService {
  static async getAll() {
    return await ItemModel.find({});
  }

  static async getFiltered(filter: Record<string, any>) {
    return ItemModel.find({ ...filter });
  }

  static async getOne(
    filter: Record<string, any>,
  ): Promise<ItemDocument | null> {
    return (await ItemModel.findOne({ ...filter })) as ItemDocument;
  }

  static async delete(itemId: string) {
    const item = await ItemService.getOne({ _id: itemId });
    if (!item) {
      throw {
        status: 'error',
        code: 404,
        message: 'No item found with this id',
      };
    }
    await item.delete();
  }

  static async exists(filter: Record<string, any>) {
    return ItemModel.exists({ ...filter });
  }

  static async create(item: Item) {
    return await ItemModel.create({ ...item });
  }
}
