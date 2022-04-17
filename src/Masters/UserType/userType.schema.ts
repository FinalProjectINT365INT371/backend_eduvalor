import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Video extends Document {
  readonly description: string;
  readonly sources: Array<string>;
  readonly subtitle: string;
  readonly thumb: string;
  readonly title: string;
  readonly like: number;
  readonly view: number;
  readonly score: number;
}

export const VideoSchema = new mongoose.Schema({
  description: String,
  sources: [String],
  subtitle: String,
  thumb: String,
  title: String,
  like: Number,
  view: Number,
  score: Number,
});