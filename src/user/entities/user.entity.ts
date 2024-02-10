import { Review } from 'src/review/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: '' })
  avatar: string;

  @OneToMany(() => Review, (review) => review.author)
  reviews: Review[];
}
