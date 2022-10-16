import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserProfile extends Document {
  _id: Object;
  Username: string;
  Password: string;
  Firstname: string;
  Lastname: string;
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
  Username: String,
  Password: String,
  Firstname: String,
  Lastname: String,
  Email: String,
  Tel: String,
  Address: String,
  BirthDate: String,
  Role: String,
  ImageUrl: String,
  ContentCreated: [String],
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
  PSID: String,
  GoogleAccess: Boolean,
});
