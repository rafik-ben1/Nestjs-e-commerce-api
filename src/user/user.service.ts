import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository : Repository<User> ){}
  
  async create(createUserDto: CreateUserDto) : Promise<User> {
    const user  = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);
  }

  findAll() : Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOne({where:{id}})
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const user = await this.userRepository.findOne({where:{id}});

    if (!user) {
      throw new NotFoundException()
    }

    
    this.userRepository.merge(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  remove(id: number) {
    this.userRepository.delete(id)
  }
}
