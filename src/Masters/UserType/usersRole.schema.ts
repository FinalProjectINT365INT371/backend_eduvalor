import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserRole extends Document {
  readonly RoleId: number;
  readonly RoleName: string;
  readonly CreateBy: string;
  readonly CreateDate: string;
  readonly UpdateDate: string;
  readonly DeleteFlag: boolean;
}

export const UserRoleSchema = new mongoose.Schema({
  RoleId: Number,
  RoleName: String,
  CreateBy: String,
  CreateDate: String,
  UpdateDate: String,
  DeleteFlag: Boolean,
});
