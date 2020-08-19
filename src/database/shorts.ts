import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

const shortsSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  shortUrl: {
    type: String
  },
  longUrl: {
    type: String
  },
  validUntil: {
    type: Date
  }
});

export const shortsModel = mongoose.model('short', shortsSchema);
