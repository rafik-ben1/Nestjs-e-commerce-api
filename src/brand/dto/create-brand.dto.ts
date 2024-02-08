import { IsString, MinLength } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @MinLength(3)
    title : string;

    @IsString()
    description : string;

    @IsString()
    image : string;
}
