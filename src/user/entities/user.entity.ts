import { Review } from "src/review/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()

    id : number;

    @Column()

    name : string;

    @Column()

    email : string;

    @Column()

    password : string;

    @Column({default:"user"})

    role : string;

    @Column()

    avatar : string;

    @OneToMany(()=>Review,review => review.author)

    reviews : Review[];
}
