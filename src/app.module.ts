import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/entities/brand.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ttt',
      entities: [Product, Brand, User, Review],
      synchronize: true,
    }),
    ProductModule,
    BrandModule,
    UserModule,
    ReviewModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
