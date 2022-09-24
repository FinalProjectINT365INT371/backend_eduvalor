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

  }
  