import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface ShareLog extends Document {
  _id: Object;
  ContentId: string;
  UserId: string;
  Platform: string;
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const ShareLogSchema = new mongoose.Schema({
  _id: Object,
  ContentId: String,
  UserId: String,
  Platform: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});

