import { model, Schema } from 'mongoose';
import { ItemTypes } from '../items/interface/item.interface';
import { Class } from '../users/interfaces/user.interface';

const ItemSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ItemTypes, required: true },
  effect: { type: Number, default: 0 },
  restricted: { type: String, enum: Class, default: undefined },

  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

ItemSchema.index({ created_at: 'text' });

ItemSchema.pre('save', function (next) {
  try {
    this.set({ updatedAt: new Date() });
    next();
  } catch (error) {
    return next(error);
  }
});

export const ItemModel = model('Item', ItemSchema);
