import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateUserActivities {

    @IsNumber()
    readonly LogId: string;

    @IsString()
    readonly UserId:string;

    @IsString()
    readonly ContentId:string;

    @IsString()
    readonly Action:string;

    @IsString()
    readonly CreateBy: string;

    @IsString()
    readonly CreateDate: string;

    @IsString()
    readonly UpdateDate: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}

