import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface ContentData extends Document {
  readonly Id:string;
  readonly Header: string;
  readonly TextData: string;
  readonly ContentCategory:string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const ContentDataSchema = new mongoose.Schema({
  Id: String,
  Header: String,
  TextData: String,
  ContentCategory:String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
