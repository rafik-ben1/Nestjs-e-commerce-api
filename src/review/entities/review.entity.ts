import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    
    @PrimaryGeneratedColumn()

    id : number;

    @Column()

    rating : number;

    @Column()

    comment : string;

    @ManyToOne(()=>User,(user)=>user.reviews)

    author : User;
  
}
