import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ContentApproving extends Document {
  readonly Id: number;
  readonly ContentId: string;
  readonly UserId: string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const ContentApprovingSchema = new mongoose.Schema({
  Id: Number,
  ContentId: String,
  UserId: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
