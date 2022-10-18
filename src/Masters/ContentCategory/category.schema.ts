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
  CategoryName: {
    type: String,
    unique: true,
    required: [true, 'Must have Category Name'],
  },
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: {
    type: Boolean,
    required: [true, 'Must have flag'],
  },
});
