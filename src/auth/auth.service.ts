import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { BcryptService } from './bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly bcrypt: BcryptService,
    private readonly jwt: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException('no user found with the provided email!');
    }
    const isMatch = this.bcrypt.comparePasswords(
      loginDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('incorrect password!');
    }
    const token = this.jwt.sign(`${user.id}`);
    return { ...user, token };
  }
}
