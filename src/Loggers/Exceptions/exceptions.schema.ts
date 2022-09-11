import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Exceptions extends Document {
  readonly LogId: string;
  readonly Massage:string;
  readonly Type:string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const ExceptionsSchema = new mongoose.Schema({
  LogId: String,
  Massage:String,
  Type:String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
