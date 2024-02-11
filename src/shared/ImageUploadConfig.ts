import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';

export const ImageUploadConfig = (fieldName: string) =>
  FileInterceptor(fieldName, {
    fileFilter(req, file, callback) {
      if (!file.mimetype.startsWith('image')) {
        return callback(
          new BadRequestException('uploaded file must be an image'),
          false,
        );
      }
      return callback(null, true);
    },
    limits: {
      fileSize: 100000,
    },
  });
