import { Document, model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  tokenValidity: { type: Date, default: null },
  character: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.index({ username: 'text', email: 'text', created_at: 'text' });

UserSchema.pre('save', function (next) {
  try {
    this.set({ updatedAt: new Date() });
    next();
  } catch (error) {
    return next(error);
  }
});

export interface User extends Document {
  username: string;
  email: string;
  token: string;
  tokenValidity: string;
  character: Schema.Types.ObjectId | Record<string, unknown>;
}

export const UserModel = model('User', UserSchema);
