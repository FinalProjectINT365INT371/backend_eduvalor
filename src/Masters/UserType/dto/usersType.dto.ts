import { IsNotEmpty, IsNumber, IsNumberString, IsString,IsArray } from "class-validator";

export class CreateVideoDto {

    @IsString()
    readonly description: string;

    @IsString()
    @IsArray()
    readonly sources: Array<string>;

    @IsString()
    readonly subtitle: string;

    @IsString()
    readonly thumb: string;

    @IsString()
    readonly title: string;

    @IsNumber()
    readonly like: number;

    @IsNumber()
    readonly view: number;

    @IsNumber()
    readonly score: number;

}

