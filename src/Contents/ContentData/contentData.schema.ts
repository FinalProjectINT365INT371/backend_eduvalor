import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ContentData extends Document {
  _id: Object;
  Id: string;
  Header: string;
  TextData: string;
  ContentCategory: string;
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const ContentDataSchema = new mongoose.Schema({
  _id: Object,
  Id: String,
  Header: String,
  TextData: String,
  ContentCategory: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
