import { ItemModel } from '../models/ItemModel';
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
    populate: boolean = true,
  ): Promise<Item | null> {
    const populateFields = populate ? 'character' : '';
    return ((await ItemModel.findOne({ ...filter }).populate(
      populateFields,
    )) as unknown) as Item;
  }

  static async exists(filter: Record<string, any>) {
    return ItemModel.exists({ ...filter });
  }

  static async create(item: Item) {
    return await ItemModel.create({ ...item });
  }
}
