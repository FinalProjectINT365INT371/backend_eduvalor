import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { CommentData } from '../Comment/comment.schama';
import { ContentApproving } from '../ContentApproving/contentApproving.schema';
export interface ContentData extends Document {
  _id: Object;
  Header: string;
  TextData: [String];
  ContentCategory: [String];
  Coordinate: [string];
  ImageUrl:[String];
  Comment:[CommentData];
  ApproveData:[ContentApproving];
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const ContentDataSchema = new mongoose.Schema({
  _id: Object,
  Header: String,
  TextData: [String],
  ContentCategory:  [String],
  ImageUrl:[String],
  Coordinate: [String],
  Comment:[Object],
  ApproveData:[Object],
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});

