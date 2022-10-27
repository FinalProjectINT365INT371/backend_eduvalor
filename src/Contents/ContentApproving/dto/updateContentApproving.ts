import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString,
    IsArray,
    IsBoolean,
  } from 'class-validator';
  
  export class UpdateContentApproving {
    @IsString()
    readonly ApproveId: string;

    @IsString()
    readonly ContentId: string;

    @IsString()
    readonly UserId: string;

    @IsString()
    readonly Comment: string;

    @IsString()
    readonly ApproveStatus: string;

}

export class DeleteContentApproving {
  @IsString()
  readonly ApproveId: string;

  @IsString()
  readonly ContentId: string;

  @IsString()
  readonly UserId: string;

}