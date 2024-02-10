import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BcryptService } from 'src/auth/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private cloudinary: CloudinaryService,
    private readonly bcrypt: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (emailExists) {
      throw new BadRequestException('email already taken');
    }
    createUserDto.password = await this.bcrypt.hashPassword(
      createUserDto.password,
    );
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: { name: true, email: true, role: true, avatar: true },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { name: true, email: true, role: true, avatar: true },
    });
    if (!user) throw new NotFoundException('no user found');
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('user not found!');
    }
    if (file) {
      const avatar = await this.cloudinary.uploadImage(file);
      return await this.userRepository.update(user.id, {
        ...updateUserDto,
        avatar: avatar.secure_url,
      });
    }
    return await this.userRepository.update(user.id, updateUserDto);
  }

  remove(id: number) {
    this.userRepository.delete(id);
  }
}
