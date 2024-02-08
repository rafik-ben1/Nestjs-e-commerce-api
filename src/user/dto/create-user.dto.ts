import { IsEmail, IsIn, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {

    @IsString()
     @MinLength(3)

    name : string;

    @IsEmail()

    email : string;

    @IsString()
    @IsIn(["user","admin"])

    role : string;

    @IsString()
    @MinLength(8)

    password : string;


}
