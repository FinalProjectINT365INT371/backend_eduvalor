import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  IsArray,
  IsBoolean,
  isEmpty,
  IsEmpty,
  IsOptional,
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

  @IsOptional()
  @IsString()
  CreateBy?: string;

  @IsOptional()
  @IsBoolean()
  DeleteFlag?: boolean;

  @IsOptional()
  @IsString()
  PSID?: string;

  @IsOptional()
  @IsBoolean()
  GoogleAccess?: boolean;
}

export class ResponseUserProfile {
  id:string;
  Username: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  Tel: string;
  Address: string;
  BirthDate: string;
  Role: string;
}

