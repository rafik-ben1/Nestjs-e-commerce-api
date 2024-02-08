import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()

    id : number;

    @Column()
    
    title : string;
    
    @Column()
    
    description : string;
    
    @Column()
    
    image : string;

    @OneToMany(()=>Product, product => product.brand)

    products : Product[]
}
