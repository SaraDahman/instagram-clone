import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth-guard';
import { FileSizeValidationPipe } from 'src/core/Pipes/FileSizeValidation.pipe';
import { CloudinaryService } from './cloudinary.service';

const imageRegex = /^image\/(jpeg|png|jpg)$/;

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinary: CloudinaryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
  ) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
