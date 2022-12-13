import { Module } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ViewersController } from './viewers.controller';

@Module({
  controllers: [ViewersController],
  providers: [ViewersService],
})
export class ViewersModule {}
