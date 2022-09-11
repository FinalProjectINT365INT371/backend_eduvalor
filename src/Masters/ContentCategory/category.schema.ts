import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ContentCategory extends Document {
  readonly Id: number;
  readonly CategoryName: string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const ContentCategorySchema = new mongoose.Schema({
  Id: Number,
  CategoryName: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
