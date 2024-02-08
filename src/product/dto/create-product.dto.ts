import {IsIn, IsNumber, IsString} from "class-validator"
import { Brand } from "src/brand/entities/brand.entity";
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

    @IsNumber()

    brand : Brand;

    @IsNumber()

    stock : number;
    
}
