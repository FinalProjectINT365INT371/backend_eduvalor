import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ContentData extends Document {
  _id: Object;
  Header: string;
  TextData: [String];
  ContentCategory: [String];
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const ContentDataSchema = new mongoose.Schema({
  _id: Object,
  Header: String,
  TextData: [String],
  ContentCategory:  [String],
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});

