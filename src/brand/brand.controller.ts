import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ImageUploadConfig } from 'src/shared/ImageUploadConfig';
import { RoleGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin')
  @UseInterceptors(ImageUploadConfig('image'))
  @Post()
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.brandService.create(createBrandDto, file);
  }

  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin')
  @UseInterceptors(ImageUploadConfig('image'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() file,
  ) {
    return this.brandService.update(+id, updateBrandDto, file);
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
