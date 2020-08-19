import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

export interface IShort {
  shortUrl: string;
  longUrl: string;
  validUntil: Date;
}

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

// What would be nice is linking the collection, name and schema together
// In a larger world example, having an IOC injection would be useful to
// inject and control the models...
export const shortsModel = mongoose.model<mongoose.Document, mongoose.Model<mongoose.Document, IShort>>('short', shortsSchema);
