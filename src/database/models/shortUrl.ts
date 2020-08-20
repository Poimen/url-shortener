import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

export interface IShortUrl extends mongoose.Document {
  shortHash: string;
  longUrl: string;
  validUntil: Date;
}

const shortUrlSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  shortHash: {
    type: String,
    required: true,
    unique: true
  },
  longUrl: {
    type: String,
    required: true
  },
  validUntil: {
    type: Date,
    required: false
  }
});

// What would be nice is linking the collection, name and schema together
// In a larger world example, having an IOC injection would be useful to
// inject and control the models...
const ShortUrl: mongoose.Model<IShortUrl> = mongoose.model('shorturl', shortUrlSchema);
export default ShortUrl;
