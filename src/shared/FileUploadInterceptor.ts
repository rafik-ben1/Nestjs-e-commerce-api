import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const FileUploadInterceptor = (fieldName: string) => FileInterceptor(fieldName, {
  storage: diskStorage({
    destination: (req, file, callback) => {
      if (!file.mimetype.startsWith('image')) {
        callback(new BadRequestException('Please provide an image'), 'uploads/');
        return;
      }

      callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
      const uniqueFileName = `${Date.now()}-${file.originalname}`;
      callback(null, uniqueFileName);
    },
  }),
});
