import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileUploadInterceptor } from 'src/shared/FileUploadInterceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 
   
  async create(@Body() createUserDto: CreateUserDto,) {
     return await this.userService.create(createUserDto) 
  }

  @Get()
async findAll() {
    return await this.userService.findAll();
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseInterceptors(FileUploadInterceptor("avatar")) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
