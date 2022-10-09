import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ContentCategory extends Document {
  _id: Object;
  CategoryName: string;
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const ContentCategorySchema = new mongoose.Schema({
  _id: Object,
  CategoryName: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
