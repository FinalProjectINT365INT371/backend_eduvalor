import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface InterfaceApi extends Document {

  readonly RequestId: string;
  readonly ContentId:string;
  readonly UserId:string;
  readonly Status:string;
  readonly Request:string;
  readonly Response:string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const InterfaceApiSchema = new mongoose.Schema({
  RequestId: String,
  ContentId:String,
  UserId:String,
  Status:String,
   Request:String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
