import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateExceptions {

    @IsNumber()
    readonly LogId: string;

    @IsString()
    readonly Massage:string;

    @IsString()
    readonly Type:string;

    @IsString()
    readonly CreateBy: string;

    @IsString()
    readonly CreateDate: string;

    @IsString()
    readonly UpdateDate: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}

