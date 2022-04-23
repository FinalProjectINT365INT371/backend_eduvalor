import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray, IsBoolean } from "class-validator";

export class CreateUserRole {

    @IsNumber()
    readonly RoleId: number;

    @IsString()
    readonly RoleName:string;

    @IsString()
    readonly CreateBy: string;

    @IsString()
    readonly CreateDate: string;

    @IsString()
    readonly UpdateDate: string;

    @IsBoolean()
    readonly DeleteFlag: boolean;


}

