import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserPolicyRequest extends Document {
  readonly RequestId:string; 
  readonly UserId: String;
  readonly Status:string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const UserPolicyRequestSchema = new mongoose.Schema({
  RequestId: String,
  UserId: String,
  Status: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
