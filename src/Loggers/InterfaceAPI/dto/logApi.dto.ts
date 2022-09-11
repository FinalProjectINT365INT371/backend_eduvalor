import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateInterfaceApi {

    @IsNumber()
    readonly RequestId: string;

    @IsString()
    readonly ContentId:string;

    @IsString()
    readonly UserId:string;

    @IsString()
    readonly Status:string;

    @IsString()
    readonly Request:string;

    @IsString()
    readonly Response:string;

    @IsString()
    readonly CreateBy: string;

    @IsString()
    readonly CreateDate: string;

    @IsString()
    readonly UpdateDate: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}

