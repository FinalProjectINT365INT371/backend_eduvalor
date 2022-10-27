import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { CommentData } from '../Comment/comment.schama';
import { ContentApproving } from '../ContentApproving/contentApproving.schema';
export interface ContentData extends Document {
  _id: Object;
  Header: string;
  TextData: [String];
  ContentCategory: [String];
  Coordinate: [Object];
  ImageUrl: [String];
  Comment: [CommentData];
  ApproveData: [ContentApproving];
  Share: number;
  View: number;
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const ContentDataSchema = new mongoose.Schema({
  _id: Object,
  Header: {
    type: String,
    required: [true, 'Must have Content Header'],
  },
  TextData: {
    type: [String],
    required: [true, 'Must have Content Data'],
  },
  ContentCategory: {
    type: [String], //FIll
    // enum: {
    //   values: ['FACEBOOK','LINK','TWITTER'],
    //   message: '{VALUE} is not supported'
    // },
    required: [true, 'Must have Content Data'],
  },
  ImageUrl: [String],
  Coordinate: [Object],
  Comment: [Object],
  ApproveData: [Object],
  Share: {
    type: Number,
    default: 0,
  },

  View: {
    type: Number,
    default: 0,
  },
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: {
    type: Boolean,
    required: [true, 'Must have flag'],
  },
});
