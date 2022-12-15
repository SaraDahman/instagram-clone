import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth-guard';
import { getUser } from '../auth/decorator/user.decorator';
import { findAllQueryDTO } from './dto/find-all-query.dto';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@getUser() userId: number, @Body() dto: CreatePostDto) {
    return this.postsService.create(userId, dto);
  }

  @Get()
  findAll(@getUser() userId: number, @Query() dto: findAllQueryDTO) {
    console.log(dto);
    return this.postsService.findAll(userId, dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @getUser() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(userId, id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@getUser() userId: number, @Param('id', ParseIntPipe) id: number) {
    console.log(userId);
    return this.postsService.remove(userId, id);
  }
}
