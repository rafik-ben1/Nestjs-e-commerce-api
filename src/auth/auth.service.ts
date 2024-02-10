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
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly bcrypt: BcryptService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException('no user found with the provided email!');
    }
    const isMatch = await this.bcrypt.comparePasswords(
      loginDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('incorrect password!');
    }
    const payload = { sub: user.id, role: user.role };
    const token = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });
    return {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    };
  }
  async register(registerDto: RegisterDto) {
    const userExists = await this.userRepository.findOneBy({
      email: registerDto.email,
    });
    if (userExists) {
      throw new BadRequestException('email already taken');
    }
    const hashedPassword = await this.bcrypt.hashPassword(registerDto.password);
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const payload = { sub: savedUser.id, role: savedUser.role };
    const token = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });
    return {
      user: {
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        avatar: savedUser.avatar,
      },
      token,
    };
  }
}
