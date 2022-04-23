import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateContent {

    @IsNumber()
    readonly Id: string;

    @IsString()
    readonly Header:string;

    @IsString()
    readonly TextData:string;

    @IsString()
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

