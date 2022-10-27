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
  
  export class UpdateUserProfile {

    @IsOptional()
    @IsString()
    Displayname: string;
  
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

  }
  