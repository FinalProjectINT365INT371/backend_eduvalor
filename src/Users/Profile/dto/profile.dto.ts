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
  Displayname: string;

  // @IsString()
  // Lastname: string;

  @IsOptional()
  @IsString()
  Email: string;

  @IsOptional()
  @IsString()
  Tel: string;

  @IsOptional()
  @IsString()
  Address: string;

  @IsOptional()
  @IsString()
  BirthDate: string;

  @IsOptional()
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
  Displayname: string;
  Email: string;
  Tel: string;
  Address: string;
  BirthDate: string;
  Role: string;
  ImageUrl: string;
  ContentCreated: [string];
}

