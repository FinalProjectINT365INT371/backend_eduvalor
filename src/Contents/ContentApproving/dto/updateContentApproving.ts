import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString,
    IsArray,
    IsBoolean,
    IsOptional,
  } from 'class-validator';
  
  export class UpdateContentApproving {
    @IsString()
    readonly ApproveId: string;

    @IsString()
    readonly ContentId: string;

    @IsString()
    readonly UserId: string;
    
    @IsOptional()
    @IsString()
    readonly Comment: string;

    @IsOptional()
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