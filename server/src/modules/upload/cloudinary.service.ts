import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { Messages } from '../../core/messages';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse | any> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { quality: 'auto:low' },
        (error, result) => {
          if (error) return reject(error);
          const { secure_url } = result;
          resolve({
            image: secure_url,
            status: 201,
            message: Messages.CREATE_SUCCESS,
          });
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
