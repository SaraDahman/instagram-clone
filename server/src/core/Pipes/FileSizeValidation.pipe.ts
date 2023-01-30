import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: any, metadata: ArgumentMetadata) {
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    const maxSize = 5 * 1024 * 1024; // 5 MB
    const extension = file.originalname.split('.').pop();
    if (!allowedExtensions.includes(extension)) {
      throw new BadRequestException(
        `Invalid file extension. Allowed extensions are: ${allowedExtensions}`,
      );
    }

    if (file.size > maxSize) {
      throw new BadRequestException(
        `File size too large. Maximum size is: ${maxSize} bytes`,
      );
    }
    return file;
  }
}
