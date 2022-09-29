import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface CommentData extends Document {
  _id: Object;
  UserId: string;
  ContentId: string;
  Comment: string;
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const CommentSchema = new mongoose.Schema({
  _id: Object,
  UserId: String,
  ContentId: String,
  Comment: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});

