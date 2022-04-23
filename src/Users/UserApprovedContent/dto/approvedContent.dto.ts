import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateUserApprovedContent {

    @IsNumber()
    readonly UserId: String;

    @IsString()
    readonly ContentId:string; 

    @IsString()
    readonly CreateBy: string;

    @IsString()
    readonly CreateDate: string;

    @IsString()
    readonly UpdateDate: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}

