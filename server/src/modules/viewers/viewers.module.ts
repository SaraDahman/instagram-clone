import { Module } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ViewersController } from './viewers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Viewer } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([Viewer])],
  controllers: [ViewersController],
  providers: [ViewersService],
})
export class ViewersModule {}
