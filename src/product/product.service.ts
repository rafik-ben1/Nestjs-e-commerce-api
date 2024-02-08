import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository : Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto)  {
    const product = this.productRepository.create(createProductDto)
   return await this.productRepository.save(product)
  }

   async findAll(): Promise<Product[]> {
    return await this.productRepository.find()
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({where:{id}})
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return ""
  }

  remove(id: number) {
    return this.productRepository.delete(id)
  }
}
