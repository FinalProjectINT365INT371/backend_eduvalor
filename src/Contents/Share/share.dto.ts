import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString,
    IsArray,
    IsBoolean,
  } from 'class-validator';
  
  export class CreateShareLog {
    @IsString()
    readonly ContentId: string;
  
    @IsString()
    readonly UserId: string;
  
    @IsString()
    readonly Platform: string;

  }
  