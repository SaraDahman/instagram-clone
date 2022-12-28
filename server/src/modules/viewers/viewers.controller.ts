import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ValidationParamPipe } from '../../core/Pipes';
import { JwtAuthGuard } from '../auth/strategy';
import { GetUser } from '../auth/decorator/user.decorator';

@Controller('viewers')
export class ViewersController {
  constructor(private readonly viewersService: ViewersService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(
    @GetUser() userId: number,
    @Param('id', ValidationParamPipe) id: number,
  ) {
    return this.viewersService.create(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAll(
    @GetUser() userId: number,
    @Param('id', ValidationParamPipe) id: number,
  ) {
    return this.viewersService.findAll(userId, id);
  }
}
