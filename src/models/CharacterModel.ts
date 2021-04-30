import { model, Schema } from 'mongoose';
import { Class } from '../users/interfaces/user.interface';

const CharacterSchema = new Schema({
  lp: { type: Number, default: 200 },
  maxLp: { type: Number, default: 200 },
  mp: { type: Number, default: 100 },
  maxMp: { type: Number, default: 100 },

  class: { type: String, enum: Class, default: Class.FREELANCE },
  level: { type: Number, required: true, default: 1 },
  bag: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
      count: { type: Number },
    },
  ],

  // Stats
  str: { type: Number, default: 5 },
  agi: { type: Number, default: 5 },
  end: { type: Number, default: 5 },
  int: { type: Number, default: 5 },

  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

CharacterSchema.index({ created_at: 'text' });

CharacterSchema.pre('save', function (next) {
  try {
    this.set({ updatedAt: new Date() });
    next();
  } catch (error) {
    return next(error);
  }
});

export const CharacterModel = model('Character', CharacterSchema);
