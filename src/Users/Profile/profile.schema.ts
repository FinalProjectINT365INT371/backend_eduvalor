import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserProfile extends Document {
  readonly Id: number;
  readonly Username: string;
  readonly Password: string;
  readonly Firstname: string;
  readonly Lastname: string;
  readonly Email: string;
  readonly Tel: string;
  readonly Address: string;
  readonly BirthDate: string;
  readonly Role: string;
  readonly ImageUrl: string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const UserProfileSchema = new mongoose.Schema({
  Id: Number,
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
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
