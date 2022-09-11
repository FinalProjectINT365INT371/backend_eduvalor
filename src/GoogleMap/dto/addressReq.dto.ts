import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString,
    IsArray,
    IsBoolean,
  } from 'class-validator';
  
  export class MapAddressReq {
    @IsString()
    Street: string;
  
    @IsString()
    Number: string;
      
    @IsString()
    City: string;

    @IsString()
    State: string;

    @IsString()
    PostalCode: string;

  }
  