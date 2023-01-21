import { Module } from '@nestjs/common';
import { UploadController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  controllers: [UploadController],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
