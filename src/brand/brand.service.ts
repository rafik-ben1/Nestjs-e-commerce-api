import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private readonly cloudinary: CloudinaryService,
  ) {}
  async create(createBrandDto: CreateBrandDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('please provide an image');
    }
    const brandExists = await this.brandRepository.findOneBy({
      title: createBrandDto.title,
    });
    if (brandExists) throw new BadRequestException('brand title already taken');
    const image = await this.cloudinary.uploadImage(file);
    const brand = this.brandRepository.create({
      ...createBrandDto,
      image: image.secure_url,
    });
    return this.brandRepository.save(brand);
  }

  findAll() {
    return this.brandRepository.find();
  }

  findOne(id: number) {
    return this.brandRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
    file: Express.Multer.File,
  ) {
    const brand = await this.brandRepository.findOneBy({ id });
    if (file) {
      const image = await this.cloudinary.uploadImage(file);
      return await this.brandRepository.save({
        ...brand,
        ...updateBrandDto,
        image: image ? image.secure_url : brand.image,
      });
    }
    return await this.brandRepository.save({ ...brand, ...updateBrandDto });
  }

  async remove(id: number) {
    const brand = await this.brandRepository.findOneBy({ id });
    await this.cloudinary.deleteImage(brand.image);
    return await this.brandRepository.delete(id);
  }
}
