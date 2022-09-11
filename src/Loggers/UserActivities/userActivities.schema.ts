import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserActivities extends Document {
  readonly LogId: string;
  readonly UserId:string;
  readonly ContentId:string;
  readonly Action:string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const UserActivitiesSchema = new mongoose.Schema({
  LogId: String,
  UserId:String,
  ContentId:String,
  ction:String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
