import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserRole extends Document {
  _id: Object;
  RoleName: string;
  CreateBy: string;
  CreateDate: string;
  UpdateDate: string;
  DeleteFlag: boolean;
}

export const UserRoleSchema = new mongoose.Schema({
  _id: Object,
  RoleName: {
    type: String,
    unique: true,
    required: [true, 'Must have Role Name'],
  },
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: {
    type: Boolean,
    required: [true, 'Must have flag'],
  },
});
