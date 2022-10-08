import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ContentApproving extends Document {
  _id: Object;
  UserId: string;
  ContentId: string;
  Comment: string;
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
  ApproveStatus: string;
}

export const ContentApprovingSchema = new mongoose.Schema({
  _id: Object,
  UserId: String,
  ContentId: String,
  Comment: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
  ApproveStatus: String,
});
