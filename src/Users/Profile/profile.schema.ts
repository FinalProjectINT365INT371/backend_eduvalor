import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserProfile extends Document {
  _id: Object;
  Username: string;
  Password: string;
  Displayname: string;
  Email: string;
  Tel: string;
  Address: string;
  BirthDate: string;
  Role: string;
  ImageUrl: string;
  ContentCreated:[string]
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
  PSID: string;
  GoogleAccess: boolean;
}

export const UserProfileSchema = new mongoose.Schema({
  _id: Object,
  Username: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
    unique: true,
  },
  Displayname: {
    type: String,
    required: [true, 'Must have Display name'],
  },
  Email: String, // NOT sure
  Tel: String,
  Address: String,
  BirthDate: String,
  Role: {
    type: String,
    enum: {
      values: ['Admin','Developer','Content Creator','Guest'],
      message: '{VALUE} is not supported'
    },
    required: [true, 'Must have First name'],
  },
  ImageUrl: String,
  ContentCreated: [String],
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: {
    type: Boolean,
    required: [true, 'Must have flag'],
  },
  PSID: String,
  GoogleAccess: Boolean,
});
