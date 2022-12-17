import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { GetUser } from '../auth/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/strategy';
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@GetUser() userId: number, @Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(userId, createStoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@GetUser() userId: number) {
    return this.storiesService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('archived')
  findArchived(@GetUser() userId: number) {
    return this.storiesService.findArchived(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    if (id < 0) throw new BadRequestException('expected a positive id');
    return this.storiesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @GetUser() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Query('force') force: boolean,
  ) {
    if (id < 1) throw new BadRequestException('expected a positive id');
    return this.storiesService.remove(userId, id, force);
  }
}
