import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'ttt',
    entities: [Product,Brand],
    synchronize: true
  }), ProductModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
