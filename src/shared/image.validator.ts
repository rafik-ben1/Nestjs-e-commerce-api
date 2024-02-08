
import { Injectable, BadRequestException} from '@nestjs/common';

@Injectable()
export class ImageValidator  {
        validate(file: Express.Multer.File) {
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException('Uploaded file is not an image');
    }

    

    if (file.size > 100000) {
      throw new BadRequestException(`Uploaded image must be less than 100 KB`);
    }
  }
}
