import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';
import { JWT_SECRET } from './constants';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './roles.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService, AuthGuard, RoleGuard],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [BcryptService],
})
export class AuthModule {}
