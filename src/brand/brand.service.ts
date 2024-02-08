import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository : Repository<Brand>
  ){}
  create(createBrandDto: CreateBrandDto) {
    const brand =  this.brandRepository.create(createBrandDto);
    return  this.brandRepository.save(brand)
  }

  findAll() {
    return this.brandRepository.find();
  }

  findOne(id: number) {
    return this.brandRepository.findOne({where:{id}});
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
