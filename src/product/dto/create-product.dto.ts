import {IsIn, IsNumber, IsString} from "class-validator"
export class CreateProductDto {

    @IsString()

    title : string ; 

    @IsString()
   
    description : string;
   
    @IsNumber()
    
    price : number;

    @IsString()
    @IsIn(["male","female","unisexe"])

    gender : string;
    
}
