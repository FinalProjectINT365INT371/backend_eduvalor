import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface ShareLog extends Document {
  _id: Object;
  ContentId: string;
  UserId: string;
  Platform: string;
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const ShareLogSchema = new mongoose.Schema({
  _id: Object,
  ContentId:{
    type: String,
    required: [true, 'Must have Content Id'],
  },
  UserId: {
    type: String,
    required: [true, 'Must have User Id'],
  },
  Platform: {
    type: String,
    enum: {
      values: ['FACEBOOK','LINK','TWITTER'],
      message: '{VALUE} is not supported'
    },
    required: [true, 'Must have Platform']
  },
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: {
    type: Boolean,
    required: [true, 'Must have flag'],
  },
});

