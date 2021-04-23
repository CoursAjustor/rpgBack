import { model, Schema } from 'mongoose';

const CharacterSchema = new Schema({
  life: { type: Number, default: 200 },
  maxLife: { type: Number, default: 200 },
  mp: { type: Number, default: 100 },
  maxMp: { type: Number, default: 100 },

  class: { type: String, enum: ['freelance'], default: 'freelance' },
  level: { type: Number, required: true, default: 1 },

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
