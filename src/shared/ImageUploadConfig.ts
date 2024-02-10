import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';

export const ImageUploadConfig = (fieldName: string) =>
  FileInterceptor(fieldName, {
    fileFilter(req, file, callback) {
      if (!file.mimetype.startsWith('image')) {
        throw new BadRequestException('uploaded file must be an image');
      }
      if (file.size > 100000) {
        throw new BadRequestException(
          'uploaded file must be less than 100kb in size',
        );
      }
      return callback(null, true);
    },
  });
