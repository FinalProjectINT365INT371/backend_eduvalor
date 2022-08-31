import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateUserProfile {
  @IsString()
  Username: string;

  @IsString()
  Password: string;

  @IsString()
  Firstname: string;

  @IsString()
  Lastname: string;

  @IsString()
  Email: string;

  @IsString()
  Tel: string;

  @IsString()
  Address: string;

  @IsString()
  BirthDate: string;

  @IsString()
  Role: string;

  @IsString()
  CreateBy: string;

  @IsBoolean()
  DeleteFlag: boolean;

  @IsString()
  PSID: string;

  @IsBoolean()
  GoogleAccess: boolean;
}
