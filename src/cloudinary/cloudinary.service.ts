import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      const buffer = Readable.from(file.buffer);
      buffer.pipe(upload);
    });
  }
  async deleteImage(url: string) {
    try {
      const publicId = this.extractPublicIdFromUrl(url);

      const deletionResult = await v2.uploader.destroy(publicId);

      return deletionResult;
    } catch (error) {
      throw error;
    }
  }

  private extractPublicIdFromUrl(url: string): string {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const publicId = filename.split('.')[0];
    return publicId;
  }
}
