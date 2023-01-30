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
    console.log(file);
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

//
// {
//   fieldname: 'files',
//   originalname: 'Arch.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 56 00 00 01 d5 08 06 00 00 00 f2 e7 6a 34 00 00 00 01 73 52 47 42 00 ae ce
// 1c e9 00 00 00 04 ... 85184 more bytes>,
//   size: 85234
// }
