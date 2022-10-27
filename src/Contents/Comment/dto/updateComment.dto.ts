import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString,
    IsArray,
    IsBoolean,
  } from 'class-validator';
  
  export class UpdateComment {
    @IsString()
    readonly CommentId: string;

    @IsString()
    readonly ContentId: string;

    @IsString()
    readonly UserId: string;

    @IsString()
    readonly Comment: string;

}

export class DeleteComment {
  @IsString()
  readonly CommentId: string;

  @IsString()
  readonly ContentId: string;

  @IsString()
  readonly UserId: string;

}