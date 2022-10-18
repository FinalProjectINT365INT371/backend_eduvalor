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
  UserId: {
    type: String,
    required: [true, 'Must have User Id'],
  },
  ContentId: {
    type: String,
    required: [true, 'Must have Content Id'],
  },
  Comment: {
    type: String,
    required: [true, 'Must have Comment'],
  },
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: {
    type: Boolean,
    required: [true, 'Must have flag'],
  },
  ApproveStatus: {
    type: String,
    enum: {
      values: ['PASS'],
      message: '{VALUE} is not supported'
    },
    required: [true, 'Must have Approve Status']
  },
});
