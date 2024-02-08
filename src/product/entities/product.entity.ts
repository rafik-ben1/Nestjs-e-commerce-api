import { Brand } from "src/brand/entities/brand.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique,} from "typeorm";

@Entity()
@Unique(["title"])

export class Product {
   
    @PrimaryGeneratedColumn()

    id: number;
    
    @Column()

    title : string ;

    @Column()

    price : number;

    @Column()

    description : string;

    @Column({default:0})
    
    averageRating : number;

    @Column({default:0})

    totalRatings : number;

    @Column()

    stock : number;

    @Column()

    gender : string;

    @ManyToOne(()=> Brand, (brand)=>brand.products)
    
    brand : Brand;

}
