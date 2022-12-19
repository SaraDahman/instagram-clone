import { Module } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ViewersController } from './viewers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Viewer, User, Story } from '../index.models';

@Module({
  imports: [SequelizeModule.forFeature([Viewer, User, Story])],
  controllers: [ViewersController],
  providers: [ViewersService],
})
export class ViewersModule { }
