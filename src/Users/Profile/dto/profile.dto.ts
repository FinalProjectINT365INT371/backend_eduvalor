import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateUserProfile {

    @IsNumber()
    readonly Id: number;

    @IsString()
    readonly Username:string;

    @IsString()
    readonly Password: string;

    @IsString()
    readonly Firstname: string;

    @IsString()
    readonly Lastname: string;

    @IsString()
    readonly Email: string;

    @IsString()
    readonly Tel: string;

    @IsString()
    readonly Address: string;

    @IsString()
    readonly BirthDate: string;

    @IsString()
    readonly Role: string;

    @IsString()
    readonly ImageUrl: string;

    @IsString()
    readonly CreateBy: string;

    @IsString()
    readonly CreateDate: string;

    @IsString()
    readonly UpdateDate: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}
