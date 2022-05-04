import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateContent {


    @IsString()
    readonly Header:string;

    @IsString()
    @IsArray()
    readonly TextData:string;

    @IsString()
    @IsArray()
    readonly ContentCategory:string;

    @IsString()
    readonly CreateBy: string;

    @IsString()
    readonly CreateDate: string;

    @IsString()
    readonly UpdateDate: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}

