import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserApprovedContent extends Document {
  readonly UserId: number;
  readonly ContentId: string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const UserApprovedContentSchema = new mongoose.Schema({
  UserId: Number,
  ContentId: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
