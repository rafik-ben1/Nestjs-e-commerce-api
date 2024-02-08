import { Brand } from "src/brand/entities/brand.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";

@Entity()
export class Product {
   
    @PrimaryGeneratedColumn()

    id: number;
    
    @Column()

    title : string ;

    @Column()

    price : number;

    @Column()

    description : string;

    @Column()

    averageRating : number;

    @Column()

    totalRatings : number;

    @Column()

    stock : number;

    @Column()

    gender : string;

    @ManyToOne(()=> Brand, (brand)=>brand.products)
    
    brand : Brand;

}
