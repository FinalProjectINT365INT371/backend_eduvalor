import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateUserPolicyRequest {

    @IsString()
    readonly RequestId:string; 
    
    @IsNumber()
    readonly UserId: String;

    @IsString()
    readonly Status:string;

    @IsString()
    readonly CreateBy: string;

    @IsString()
    readonly CreateDate: string;

    @IsString()
    readonly UpdateDate: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}

