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
    @IsArray()
    readonly ImageUrl:[String];
    
    @IsArray()
    readonly ImageFile: [File]

    @IsString()
    readonly CreateBy: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}

