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
  readonly Username: string;

  @IsString()
  readonly Password: string;

  @IsString()
  readonly Firstname: string;

  @IsString()
  readonly Lastname: string;

  @IsString()
  readonly Email: string;

  @IsString()
  readonly Tel: string;

  @IsString()
  readonly Address: string;

  @IsString()
  readonly BirthDate: string;

  @IsString()
  readonly Role: string;

  @IsString()
  readonly CreateBy: string;

  @IsBoolean()
  readonly DeleteFlag: boolean;
}
