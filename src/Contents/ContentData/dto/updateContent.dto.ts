import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class UpdateContent {


    @IsString()
    readonly Header:string;


    @IsArray()
    readonly TextData:string;


    @IsArray()
    readonly ContentCategory:string;

    // @IsString()
    // @IsArray()
    // readonly ImageUrl:[String];
    
    // @IsArray()
    // readonly ImageFile: [File]
    
    // @IsString()
    // readonly DeleteFlag: string;


}

