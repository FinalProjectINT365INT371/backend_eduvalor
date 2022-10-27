import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateContentApproving {

    @IsString()
    readonly ContentId: string;

    @IsString()
    readonly UserId: string;

    @IsString()
    readonly Comment: string;

    @IsString()
    readonly ApproveStatus: string;


}

